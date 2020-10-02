# Get Keys

Gets a list of [keys](keys.md). The passcode is extracted by the API from the JWT Token.

---

<span class="method get">GET</span> /keys

---

***Parameters***

| Name        | Type    | In     | Description |
| :---        | :---    | :---   | :--- |
| accept      | string  | header | Setting to application/json is recommended. |
| passcode    | string  | header | Permission and grouping key ([See Passcodes](./passcodes.md)).  |

---

***Usage***
<!-- tabs:start -->

#### ** CURL **

```bash
curl get https://ty.me.com/keys \
-h {accept:"application/json", passcode:"1234"}
```

#### ** Javascript **

```javascript
const options = {
  headers: {'accept': 'application/json', 'passcode':'1234'}
};

const resp = await axios.get('/keys', options)
console.log(resp.data);
  ```
<!-- tabs:end -->

---

***Response***
<!-- tabs:start -->
#### ** Data **
```javascript
{
  "keys":[
    {"id":34, 
    "key":"KJ8HFGF6UJJN56",
    "name":"Yellowstone"
    },
    {"id":35, 
    "key":"LO8GDFS4543DF0",
    "name":"Yosemite"
    }
  ]
}

```

#### ** Errors **

```text
- 200 OK
- 403 Forbidden
- 500 Internal server error
```

<!-- tabs:end -->