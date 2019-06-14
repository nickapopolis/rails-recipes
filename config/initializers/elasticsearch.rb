# Connect to specific Elasticsearch cluster
Elasticsearch::Model.client = Elasticsearch::Client.new host: ENV['ELASTICSEARCH_URL']

# Print Curl-formatted traces in development into a file
#
if Rails.env.development?
  tracer = ActiveSupport::Logger.new('log/elasticsearch.log')
  tracer.level =  Logger::DEBUG
  Elasticsearch::Model.client.transport.tracer = tracer
end