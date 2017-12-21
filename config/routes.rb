Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  root to: "pages#manage"
  get '*path', to: 'pages#manage'
  namespace :api, defaults: { format: :json } do
    resources :posts
  end
end
