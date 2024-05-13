<a href="https://github.com/jm-classes/yummy-yams-project/blob/main/01_sujet_yummy_yams.md">Lien du sujet</a>

## Init ##

### Dev ###
```bash
make dev
```
_____
```bash
curl http://localhost:3001/initWorld

```

## API
### <u>User</u>
<i> "/user/register"</i>
 ```bash
 #Body 
 {
    "email": "toto@yopmail.com",
    "pseudo": "Toto",
    "password": "3652"
}
```
<i> "/user/login"</i>
 ```bash
 #Body 
 {
    "email": "toto@yopmail.com",
    "password": "3652"
}
```

### <u>GameEvent</u>
 <i>"/api/game"</i>
 ```bash
 #Body
 {
    "eventName": "pastries_game"
 }
 ```