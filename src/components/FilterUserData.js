import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Axios from "axios";

function UserData() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [showUsers, setShowUsers] = useState(true);
  const [showFilteredUsers, setShowFilteredUsers] = useState(false);
  // const [filterUsers, setFilterUsers] = useState([]);
  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/users").then(
      response => setData(response.data)
    )
  }, []);
  let searchLength = search.length;
  // function isNamePresentInUsers(data) {
  //   return data.name === search;
  // }
  function isSubstringPresent(a, b) {
    let matchedLength = 0;
    if (a !== undefined) {
      for (let i = 0; i <= a.length - b.length; i++) {
        for (let j = 0; j < b.length; j++) {
          if (a[i + j] === b[j]) {
            matchedLength = matchedLength + 1;
          }
          if (a[i + j] !== b[j]) {
            matchedLength = 0;
            break;
          }
          if (matchedLength === b.length) {
            return true;
          }
        }
      }
    }
    return false;
  }
  // console.log(search);
  // console.log(data);

  // const keys = ['name', 'website', 'email', 'username', 'phone'];

  // let filterUsers = data.filter((array) =>
  //   keys.some((key) => isSubstringPresent(array[key].toLowerCase(), search.toLocaleLowerCase())))


  let filteredUsersArr = [];
  let filteredKeys = [];
  for (let k = 0; k < data.length; k++) {
    let keys = Object.keys(data[k]);
    console.log(keys);
    for (let j = 0; j < keys.length; j++) {
      if (keys[j] === 'name' || keys[j] === 'website' || keys[j] === 'email' || keys[j] === 'username' || keys[j] === 'phone') {
        filteredKeys.push(keys[j]);
        console.log(filteredKeys);
      }
    }
    for (let i = 0; i < filteredKeys.length; i++) {
      console.log(data[k][filteredKeys[i]] + '  ' + search);
      let filteredUser = isSubstringPresent(data[k][filteredKeys[i]].toLowerCase(), search.toLocaleLowerCase())
      if (filteredUser) {
        filteredUsersArr.push(data[k]);
        break;

      }
    }
    console.log(filteredUsersArr);
  }
  return (
    <div className="App">
      <Form.Label className="fw-bold">Users Data</Form.Label> <br />
      <h5>Search Data Here: </h5>
      <input type="text" value={search}
        onChange={(e) => setSearch(e.target.value)} onKeyUp={() => {
          if (searchLength === 0) {
            setShowFilteredUsers(false)
            setShowUsers(true)
          }
          if (searchLength > 0) {
            setShowFilteredUsers(true)
            setShowUsers(false)
          }
        }}></input> <br /><br />
      {showUsers && <table className="table1">
        <thead>
          <tr>
            <td >Name</td>
            <td>Website</td>
            <td>Email</td>
            <td>UserName</td>
            <td>Phone</td>
          </tr>
        </thead>
        <tbody>
          {/* {data.filter(data => data.name.toLowerCase().includes(search.toLocaleLowerCase())).map((userData, index) => { */}
          {data.map((userData, index) => {
            return (
              <tr key={index}>
                <td>{userData.name}</td>
                <td>{userData.website}</td>
                <td>{userData.email}</td>
                <td>{userData.username}</td>
                <td>{userData.phone}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      }
      {showFilteredUsers && <table className="table2">
        <thead>
          <tr>
            <td >Name</td>
            <td>Website</td>
            <td>Email</td>
            <td>UserName</td>
            <td>Phone</td>
          </tr>
        </thead>
        <tbody>
          {filteredUsersArr.map((userfltData, index) => {
            return (
              <tr key={index}>
                <td>{userfltData.name}</td>
                <td>{userfltData.website}</td>
                <td>{userfltData.email}</td>
                <td>{userfltData.username}</td>
                <td>{userfltData.phone}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      }
    </div>
  );
}
export default UserData;