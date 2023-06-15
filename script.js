


const API2 = 'https://api.github.com/users';
const nameInput = document.querySelector(".serachInput");
const searchButton = document.querySelector(".searchButton");
const name = document.querySelector(".aboutUser h1");
const profilePhoto = document.querySelector('.profilePhoto');
const profileLink = document.getElementById('profileLink');
const numbOFrepos = document.getElementById('repositories')
const numOffollowers = document.getElementById('followers')
const numOffFollowing = document.getElementById('following')
const locationOfUsers = document.getElementById('userslocation')
const socialOfUser = document.getElementById('socialtwitter')
const dataAnswer = document.getElementById('usersinformation')
const popUpwindow = document.getElementById('pop_up_window')
console.log(dataAnswer);





function FetchApi(domain) {
  this.domain = domain;
}

const gitHubApi = new FetchApi('https://api.github.com/users');

FetchApi.prototype.get = async function () {
  const response = await fetch(this.domain);
  const data = response.json();
  return data;
} //получаем запрос и превращаем string на объект с помощтю json


searchButton.addEventListener('click', () => {  /// на кнопку вещаем функцию который заменит конец нагешго API2 на имя user и поставит в конец url
  const searchName = nameInput.value.trim(); //берем то что написано в input


  if (searchName) {
    const searchUrl = `${API2}/${searchName}`;

    gitHubApi.domain = searchUrl;
    gitHubApi.get()
      .then((data) => {
        console.log(data);
        if (data.message === 'Not Found') {
          
          dataAnswer.classList.remove('active')
          popUpwindow.classList.add('active')


        }


        else {
          dataAnswer.classList.add('active')
          popUpwindow.classList.remove('active')
          const userName = data.name;
          const userLogin = data.login
          const avatarPhoto = data.avatar_url;
          const linkOfGitHubProfile = data.html_url;
          const repositores = data.public_repos;
          const usersFollowers = data.followers;
          const usersFollowing = data.following;
          const location = data.location
          const usersTwitter = data.twitter_username


          profilePhoto.src = avatarPhoto;
          profileLink.innerHTML = '@' + userLogin ;
          profileLink.href = linkOfGitHubProfile;
          name.innerHTML = userName;
          numbOFrepos.innerHTML = "Repos" + '<br>' + repositores;
          numOffollowers.innerHTML = 'Followers' + '<br>' + usersFollowers;
          numOffFollowing.innerHTML = 'Following' + '<br>' + usersFollowing;

          if (usersTwitter === null) {
            socialOfUser.innerHTML = 'Not Available';
          }
          else {
            socialOfUser.innerHTML = usersTwitter;
            console.log(usersTwitter);
          }
          if (location === null) {
            locationOfUsers.innerHTML = 'Not Available';
          }
          else {
            locationOfUsers.innerHTML = location;
          }
        }
      })
      .catch(error => {
        console.log('Ошибка при получении данных пользователя:', error);
      });
  }
});