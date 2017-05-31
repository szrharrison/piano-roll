class ChangeDecimalsToFloatsOnTracks < ActiveRecord::Migration[5.0]
  def up
    change_column :tracks, :duration, :float
    change_column :tracks, :start_time, :float
  end

  def down
    change_column :tracks, :duration, :decimal
    change_column :tracks, :start_time, :decimal
  end
end
