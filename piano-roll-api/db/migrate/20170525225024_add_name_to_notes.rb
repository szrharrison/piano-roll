class AddNameToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :name, :string
  end
end
