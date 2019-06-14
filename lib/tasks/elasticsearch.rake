require 'elasticsearch/model'
require 'elasticsearch/rails/tasks/import'

namespace :elasticsearch do
    task reindex: [
        :environment,
        'elasticsearch:drop',
        'elasticsearch:index'
    ] 

    task drop: [:environment] do
        %x(curl --silent --show-error -XDELETE #{ENV['ELASTICSEARCH_URL']}/_all)
    end

    task search: [:environment] do

        puts Types::Recipe.model
        result_hash = Elasticsearch::Model.search('pork', [Recipe]).results.to_a.map(&:to_hash)
       puts  result_hash.inspect
    end

    task index: [:environment] do
        searchable_classes.each do |klass|
            klass.__elasticsearch__.create_index!(include_type_name: true)
            klass.import
        end
    end

    def searchable_classes
        Rails.application.eager_load!
        ApplicationRecord.descendants.select {|klass| klass.included_modules.include?(Elasticsearch::Model) }
    end
end
