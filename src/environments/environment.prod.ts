function imageUrl(){
  let url = window.location.pathname;
  let arrUrl = url.split('/');
  for(let i of arrUrl) {
    if(i === 'hi' || i=== 'pb') {
       return 'assets/'
    }
  }
  return 'assets/'
}

export const environment = {
  // baseUrl: 'https://ekb.gamesmasti.com/api/',
  // production: true,
  // url: "https://ekb.gamesmasti.com/api/",
  // image: window.location.pathname +"assets/"
  
   baseUrl: 'http://127.0.0.1:8081/',
   production: true,
   url: "http://127.0.0.1:8081/api/",
   image: window.location.pathname +"assets/"


};

// export const environment = {
//   baseUrl: 'http://192.168.1.9:8081/api/',
//   production: true,
//   url: "http://192.168.1.9:8081/api/",
//   image: window.location.pathname +"assets/"
// };
