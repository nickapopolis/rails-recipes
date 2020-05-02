# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_30_191700) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "ingredient_groups", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "recipe_id"
  end

  create_table "ingredients", force: :cascade do |t|
    t.string "name"
    t.string "number"
    t.string "unit_of_measurement"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "ingredient_group_id"
  end

  create_table "labels", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_category_labels", force: :cascade do |t|
    t.bigint "label_id"
    t.bigint "recipe_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["label_id"], name: "index_recipe_category_labels_on_label_id"
    t.index ["recipe_category_id"], name: "index_recipe_category_labels_on_recipe_category_id"
  end

  create_table "recipe_instructions", force: :cascade do |t|
    t.bigint "recipe_id"
    t.bigint "step"
    t.string "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_recipe_instructions_on_recipe_id"
  end

  create_table "recipe_labels", force: :cascade do |t|
    t.bigint "recipe_id"
    t.bigint "label_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["label_id"], name: "index_recipe_labels_on_label_id"
    t.index ["recipe_id"], name: "index_recipe_labels_on_recipe_id"
  end

  create_table "recipe_votes", force: :cascade do |t|
    t.bigint "recipe_id"
    t.bigint "user_id"
    t.boolean "upvote", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id", "user_id"], name: "index_recipe_votes_on_recipe_id_and_user_id", unique: true
    t.index ["recipe_id"], name: "index_recipe_votes_on_recipe_id"
    t.index ["user_id"], name: "index_recipe_votes_on_user_id"
  end

  create_table "recipeimages", force: :cascade do |t|
    t.integer "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_recipeimages_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "cook_time"
    t.date "date_published"
    t.string "description"
    t.integer "calories"
    t.integer "prep_time"
    t.string "recipe_category"
    t.integer "number_of_servings"
    t.integer "total_time"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "score", default: 0, null: false
    t.boolean "public", default: false, null: false
    t.index ["user_id"], name: "index_recipes_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_reviews_on_recipe_id"
  end

  create_table "test", id: false, force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "recipe_category_labels", "labels"
  add_foreign_key "recipe_category_labels", "recipe_categories"
  add_foreign_key "recipe_instructions", "recipes"
  add_foreign_key "recipe_labels", "labels"
  add_foreign_key "recipe_labels", "recipes"
  add_foreign_key "recipe_votes", "recipes"
  add_foreign_key "recipe_votes", "users"
  add_foreign_key "recipeimages", "recipes"
  add_foreign_key "recipes", "users"
  add_foreign_key "reviews", "recipes"
end
