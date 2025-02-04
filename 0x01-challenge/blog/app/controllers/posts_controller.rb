class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :authorize_user!, only: [:edit, :update, :destroy]

  def index
    if user_signed_in?
      @posts = Post.all.order(created_at: :desc)
    else
      @posts = Post.where(online: true).order(created_at: :desc)
    end
  end

  def show
    if !@post.online? && @post.user != current_user
      redirect_to root_path, alert: "This post is not available."
    end
  end

  def new
    @post = current_user.posts.build
  end

  def create
    @post = current_user.posts.build(post_params)

    if @post.save
      redirect_to @post, notice: 'Post was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to @post, notice: 'Post was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    redirect_to root_path, notice: 'Post was successfully deleted.'
  end

  private

  def set_post
    @post = Post.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to root_path, alert: 'Post not found.'
  end

  def post_params
    params.require(:post).permit(:title, :body, :online) # Added :online
  end

  def authorize_user!
    redirect_to root_path, alert: 'You are not authorized to perform this action.' unless @post.user == current_user
  end
end

