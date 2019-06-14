module Types
  class BaseObject < GraphQL::Schema::Object

    def self.model(model = @model)
      @model = model
    end

  end
end
