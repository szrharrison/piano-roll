class ChangeDecimalsToFloatsOnNotes < ActiveRecord::Migration[5.0]
  def up
    change_column :notes, :velocity, :float
    change_column :notes, :start_time, :float
  end

  def down
    change_column :notes, :velocity, :decimal
    change_column :notes, :start_time, :decimal
  end
end
