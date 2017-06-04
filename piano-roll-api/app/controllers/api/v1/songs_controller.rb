class Api::V1::SongsController < Api::V1::ApplicationController
  before_action :set_song, only: [:show]

  def index
    render json: Song.all, each_serializer: SongsSerializer
  end

  def show
    render json: @song
  end

  private

  def set_song
    @song = Song.find(params[:id])
  end
end
