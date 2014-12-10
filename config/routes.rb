Rails.application.routes.draw do

  root 'welcome#index'

  get 'about' => 'pages#about'

  post 'add_author' => 'publications#add_author'

  resources :taxons, :only => [:show, :index, :create, :update, :destroy]
  resources :publications, :only => [:show, :index, :create, :update, :destroy]
  resources :researchers, :only => [:show, :index, :create, :update, :destroy]





end
