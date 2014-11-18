Rails.application.routes.draw do

  root 'welcome#index'

  get 'about' => 'pages#about'

  resources :publications, :only => [:show, :index, :create, :update, :destroy]
  resource :sessions, :only => [:create, :destroy]
  resources :users, :only => [:create]
  resources :events, :only => [:index, :show]
  resources :groups, :only => [:show, :index]
  resources :pages, :only => [:index]
  resources :contacts, :only => [:index, :create, :update, :destroy]
  get '/pages/:url' => 'pages#show'
  resources :images, :only => [:new, :create]
  resources :organizations, only: [:index, :show]
  resources :ads, :only => [:index]

  namespace :admin do
    resources :ads, :only => [:index, :create, :destroy, :update]
    resources :members, :only => [:index]
    resources :pages, :only => [:index, :update]
    resources :dashboard, :only => [:index]
    resources :events, :except => [:new, :edit, :index]
    resources :sections, :only => [:update, :create, :destroy]
    resources :groups, :only => [:index, :update, :create, :destroy]
    resources :packages
    resources :training_opportunities, :except => [:show]
    resources :organizations
  end

  namespace :member do
    post 'search' => 'addresses#search'
    resources :addresses, :only => [:index, :create, :update, :destroy]
    resources :users, :only => [:update]
    resources :dashboard, :only => [:index]
    resources :licenses, :only => [:index, :create, :update, :destroy]
    resources :phones, :only => [:index, :create, :update, :destroy]
    resources :links, :only => [:index, :create, :update, :destroy]
    resources :staffs, :only => [:index, :create, :update, :destroy]
    resources :tags, :only => [:index, :create, :update, :destroy]
  end
end
