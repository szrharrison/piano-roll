class API::V1::SongsController < API::V1::ApplicationController
  before_action :set_song, only: [:show]

  def index
    render json: Song.all
  end

  def show
    render json: @song
  end

  private

  def set_song
    @song = Song.find(params[:id])
  end
end
