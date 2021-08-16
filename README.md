# Blog 제작(aka. velog)

Description:	Ubuntu 20.04.2 LTS<br>
Release:	20.04<br>

사용 기술
- Node.js
- ejs
- ajax

last-update 2021-07-24

```bash
$ npm start
```

## DB info
- Using Mysql
- DB name : velog
  - table
    - sessions : mysql에 session 정보를 저장
    - user_info : 회원 정보
    - board : 게시판
    - categories : 카테고리
## user_info 구조

|NAME|DATA TYPE|LENGTH|etc.|
|:---:|:---:|:---:|:---:|
|num|INT|11|AUTO_INCREMENT|
|name|VARCHAR|100|유저 이름|
|email|VARCHAR|100|유저 이메일|
|id|VARCHAR|100|유저 아이디|
|password|VARCHAR|100|유저 비밀번호|
|user_salt|LONGTEXT||유저 비밀번호 salt키|

```javascript
//user_salt는 crypto 모듈 사용
const crypto = require('crypto')
```

## board 구조

|NAME|DATA TYPE|LENGTH|etc.|
|:---:|:---:|:---:|:---:|
|num|INT|11|AUTO_INCREMENT|
|title|VARCHAR|255|제목|
|categori|VARCHAR|255|카테고리|
|content|LONGTEXT||본문|
|writer|VARCHAR|255|글쓴이|
|date|DATETIME||날짜|

- The insert format of DATETIME is YYYY-MM-DD HH-MM-SS. (ex. 2021-07-18 21:10:59)
- DATETIME의 속성을 가진 값을 view에 출력하기 위해서 db정보에 dateStrings: 'date'를 추가해야됨.
```javascript
let db_info = {
host: 'localhost',
user: 'server_user',
password: 'server_password',
database: 'velog',
multipleStatements: true, // 다중 쿼리를 보낼 때 사용
dateStrings: 'date'
}
```

- content의 내용을 view에 출력할 때 \n,\g는 줄바꿈이 자동처리 되지 않기에 <br>태그로 치환해야된다.
```javascript
// ejs 사용
// json으로 받은 문자열을 치환 후 화면에 출력
<%- board[0].content.replace(/\n/g, '<br/>') %>
```

## categories 구조

|NAME|DATA TYPE|LENGTH|etc.|
|:---:|:---:|:---:|:---:|
|num|INT|11|AUTO_INCREMENT|
|categories|VARCHAR|255|카테고리|
|thumbnail|VARCHAR|255|카테고리 대표 이미지|

- categories table을 추가로 만든 이유는 카테고리의 관리를 편하게 하기 위함(ex. 카테고리 수정, 전용 페이지)
- Form태그의 multipart/form-data와 multer 모듈을 활용하여 이미지 업로드
  - 서버에 날짜+originalname의 이름으로 저장 및 thumbnail에 합친 이름 업로드됨.


# 기타 페이지
1. Who am I
2. Portfolio
3. Site info.
4. My info.

React 학습 후 페이지 개발할 예정, 기존 페이지 디자인 다시 구축 예정.

2021-07-21일까지의 version.

https://blog.anhye0n.me/20?category=961817
