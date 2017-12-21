class Api::PostsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_user

  def create
    post = Post.new(params["post"])
    post.user = current_user
    if post.save
      render json: {"success" => true, "message" => "#{post.title} successfully saved"}
    else
      render json: {"success" => false, "message" => post.errors.messages}
    end
  end

  def update
  end

  def destroy
  end

end
