class AddMidiInstrumentNumberToInstruments < ActiveRecord::Migration[5.0]
  def change
    add_column :instruments, :midi_instrument_number, :integer
  end
end
