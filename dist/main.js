(()=>{"use strict";const e=[{name:"Personal",tasks:[["Study hard!","01-06-2023",null],["Wash Car","26-05-2023","medium"],["Defeat Evil",null,"high"]]},{name:"Work",tasks:[["Work hard!",null,"low"],["Don't get fired","01-01-2065","high"],["Placate boss",null,null]]}],t=document.querySelector(".add-folder-container"),o=document.querySelector(".input-container"),n=document.querySelector(".button-cancel"),r=document.querySelector(".add-task-button"),c=document.querySelector(".close-modal"),l=document.querySelector(".modal");t.addEventListener("click",(function(){t.setAttribute("id","hide"),o.removeAttribute("id","hide")})),n.addEventListener("click",(function(){t.removeAttribute("id","hide"),o.setAttribute("id","hide")})),r.addEventListener("click",(function(){l.showModal()})),c.addEventListener("click",(function(){l.close()})),console.log(function(){if(function(e){let t;try{t=window.localStorage;const e="__storage_test__";return t.setItem(e,e),t.removeItem(e),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&t&&0!==t.length}}())return function(){const t=localStorage.getItem("folders");if(t)return JSON.parse(t);localStorage.clear(),localStorage.setItem("folders",JSON.stringify(e))}();console.log("storage not available")}())})();