# Plus-Life (Backend)
*It contains backend code for [Plus-Life](https://github.com/RohitKumar-200/PlusLife_Frontend) .A web app that lets you consult your doctor in a safe and more comfortable way*  
**At Plus-Life we believe there is a better way to everything. A more valuable and less invasive way where customers are earned rather than bought. We are obsessively passionate about it and our mission is to help people and doctors.We focus on safety and comfort for both the patients and doctors. We are excited to introduce you a simple, fast, comfy way to get and give help. Together - everyday reinventing what's possible**  
## Links
> [Github for Frontend](https://github.com/RohitKumar-200/PlusLife_Frontend)  
> [Heroku deployed Frontend](http://plus-life.herokuapp.com/)  
> [Github for Backend](https://github.com/RohitKumar-200/PlusLife_Backend)  
> [Heroku deployed Backend](http://pluslife-api.herokuapp.com/)  
## Local Setup guide
Fork this repository and clone it on your local machine 
Go to that directory and open any text editor of your choice
Cerate .env file in root folder  
Make a new collection on your account of cloud.mongodb.com  
Copy connection string of your mongoDB database, and write DB_CONNECTION=<connection_string> in .env file  
Also write TOKEN_SECRET=<any_random_alphanumeric_value> in .env file, it will be used to create access token using [jwt](https://jwt.io/introduction/)  
create an app in zoom copy client id and client secret from there, in .env set ZOOM_CLIENT_ID=<client_id> and ZOOM_CLIENT_SECRET=<client_secret>
Now you are ready!, open terminal any run  
```
  npm start
```
You can see your backend app running in http://localhost:3000/  
## [PPT](https://github.com/RohitKumar-200/PlusLife_Frontend/blob/master/Plus%20Life.pptx?raw=true)
