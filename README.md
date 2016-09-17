Requirements:

For development

1. Node (v5+) (install using nvm)
2. Npm (installed with node)
3. gulp (v4)(npm install -g gulpjs/gulp#4.0)
4. bower (npm install -g bower)

       nvm curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
       nvm install 5.1.0
       npm install -g gulpjs/gulp#4.0 bower 

For hosting 
1. nginx



Steps for starting development server

1. Clone repo from [github](https://github.com/vibhanshuc/OnePush-Web)
2. cd OnePush-Web
3. npm install
4. bower install
5. gulp serve
6. It will start a development server

        git clone https://github.com/vibhanshuc/OnePush-Web
        cd OnePush-Web
        npm install
        bower install
        gulp serve


Steps for deployment using nginx

1. Clone repo from [github](https://github.com/vibhanshuc/OnePush-Web)
2. cd OnePush-Web
3. npm install
4. bower install
5. gulp build
6. It will create a dist/ directory

Which can be hosted as a static site using nginx

Steps for hosting using nginx

1. Install nginx

    sudo apt-get install nginx
    
2. create a /etc/nginx/sites-enabled/onepush file

add following content into the file

      server {
              listen 80;
              listen [::]:80;
      
              server_name 52.66.164.208;
       
              root /home/ubuntu/OnePush-Web/dist;
                              
              location / {
                      try_files $uri $uri.html $uri/ /index.html;
              }
      }

Replace server_name with your server_ip or domain name
Thats it.


