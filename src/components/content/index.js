import React,{useEffect} from 'react'
import {Switch,Route} from 'react-router-dom'
import Homepage from '../homepage'
import Users from './components/users'
import Categories from './components/categories'
import axios from 'axios'



const Content = () => {
useEffect(() => {
  axios({
    // url: "http://15.206.151.171/lootbox_backend/public/api/admin/user/list",
    url: "http://15.206.151.171/lootbox_backend/public/api/admin/login",
    // method: "get",
    method: "post",
    data:{
    "email": "admin@lootbox.com",
    "password":"123456"
    },
    headers: {
      "X-Localization": "en",
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization:
      //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGEyNzhiZjQ0MjM5YjIwNjVkYmZjZGNhNzU1ZTkxYzM3Nzc0MTk5Nzc4MWUwMzlmZGViOTE4ZjEwZWFjYzBlNWMyYmVlNzI5OGQyZGM4OGQiLCJpYXQiOjE1OTM0OTU1MzQsIm5iZiI6MTU5MzQ5NTUzNCwiZXhwIjoxNjI1MDMxNTM0LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.k690oN3lko2MEDhLCTgtAdvB6_FCla9_LhQLI2JvZxCyelgnOvZTUPZlZPSGWQ8gUaKeA9ELacNNpyhX_UFYnORVfrmWUrLxwxrzf337_aWGrA_4R4rPYSjL5RQaxwimBlYP1EdPRTGvuxzCn1cBdHEbRNLP2RMobK_2bHRNJ2VQjMDgeFJVjBEC0iIqKglZOLwIAQJ0roNAYBjbhxWFEuuANrv2U_vsENrbtsfQ1x9kF27O7x-8zkAATGJqmEng7U2GzI_lMjCMzcdAL55k9n4Hg8iyr3NeOwh1BCQ7tutpzO11Fzqydzna6CDVx6nP3Ov_DCCE_1MnjTUHYtnCAe7NcwC-4FvKqE2moUtEXK1NtHF1an52SrCExcSa1JiVx2veRl6sSFucXQQC9kE1N-MkDuoTdj9ZzWqcCXCGi1xx4S5x0NPgmiD--xh7sYGUMwG7xNPd7t1FZw0QHuHaFysM_Dea90TQ4XKtUA2_x9dG96QflGGkloW1DnEcZ-A8v2l8Klsl6cLXfBcsLimIzmVPSr7OdFxpgm0IBh3YQsxJNHrA0_DhLwZFe7px1OmWfRm_ed9UHpBxFsMeDDQ3uGgdzGn3-7tEW0MjYFzs2lvSWTcmndlPbrOaY-hkrOHH_zpjoL9klbQEpLIo3cwj7NNp0YfpW6owqssiqKIh7f4",
    },
  })
    .then((data) => {
      console.log({
        categories: data.data.data,
      });
    })
    .catch((error) => console.log(error));
}, []);

    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/categories" component={Categories} />
      </Switch>
          );
}

export default Content
