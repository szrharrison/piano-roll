class ChangeDecimalsToFloatsOnSongs < ActiveRecord::Migration[5.0]
  def up
    change_column :songs, :duration, :float
  end

  def down
    change_column :songs, :duration, :decimal
  end
end
