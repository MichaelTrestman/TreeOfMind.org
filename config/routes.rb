Rails.application.routes.draw do

  root 'welcome#index'

  get 'about' => 'pages#about'

  resources :publications, :only => [:show, :index, :create, :update, :destroy]
  resources :researchers, :only => [:show, :index, :create, :update, :destroy]





end
