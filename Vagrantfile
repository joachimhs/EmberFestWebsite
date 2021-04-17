# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure('2') do |config|
  config.vm.box      = 'ubuntu/groovy64' # 20.10
  config.vm.hostname = 'emberfest'

  config.vm.network :forwarded_port, guest: 4000, host: 4000

  config.vm.provision :shell, inline: <<-SCRIPT
    apt-get -y update
    apt-get -y install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev libffi-dev
  SCRIPT

  config.vm.provision :shell, privileged: false, inline: <<-SCRIPT
    rm -rf ~/.rbenv
    git clone https://github.com/rbenv/rbenv.git ~/.rbenv
    echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
    echo 'eval "$(rbenv init -)"' >> ~/.bashrc
  
    git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
    echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc

    ~/.rbenv/bin/rbenv install 2.7.3
    ~/.rbenv/bin/rbenv global 2.7.3
  SCRIPT

  config.vm.provision :shell, privileged: false, inline: <<-SCRIPT
    ~/.rbenv/shims/gem update --system
    ~/.rbenv/shims/gem install bundler
    ~/.rbenv/shims/gem install bundler:1.14.6
  SCRIPT

  config.vm.provider 'virtualbox' do |v|
    v.memory = 2048
    v.cpus   = 2
  end
end
