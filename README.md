# GodOfColor

๐ก JavaScript๋ฅผ ์ฐ์ตํ๊ธฐ ์ํด ๋ง๋  ๊ฐ๋จํ ๊ฒ์ ์๋น์ค์๋๋ค. ๋์ด๋ ์กฐ์ ์ ํจ์จ์ ์ผ๋ก ํ๊ธฐ ์ํด ๊ณ ๋ฏผํ์๊ณ  ๋ ๋ฒจ๋ณ ๋ฐ์ค ํฌ๊ธฐ์ ์์์ ๋ณํ์ํค๋ ๊ณผ์ ์ ๊ตฌํํด๋ณด์์ต๋๋ค. ์ด๋ก ์ ๋ฌดํํ ์คํ์ด์ง๋ฅผ ๋ง๋ค์ด ์ฃผ๋ณ์ธ๋ค๋ ๋ง์กฑํ๋ ์๋น์ค์๋๋ค.

## 0. Release.

[Link](https://god-of-color.netlify.app/)

## 1. Tech stack.

HTML | CSS | JavaScript

## 2. Details.

- ์ค์ฒฉ flex๊ตฌ์กฐ๋ก ๋ง๋  ํ level ๋ณ์์ ๋ฐ๋ผ ๋ด๋ถ width, height๋ฅผ ์ฐ์ถํ๋ ๋ฐฉ์์ผ๋ก ๋ ๋ฒจ์ ๋ฐ๋ผ ์์ํฌ๊ธฐ๋ฅผ ์๋ง๊ฒ ๋ณ๊ฒฝ.

  - level ๋ณ์์ ๋ฐ๋ผ ํ ํ์ ๋์ด๊ฐ ์ค์ .
    ```javascript
    const row = document.createElement('div');
    row.style.height = `${100 / (level + 1)}%`;
    ```
  - ํ ํ์ ๋ค์ด๊ฐ ๋ฐ์ค์ width๊ฐ ์ค์ 
    ```javascript
    const rowItem = document.createElement('div');
    rowItem.style.width = `${100 / (level + 1)}%`;
    ```
  - 2์ค for๋ฌธ์ผ๋ก ๋ถ๋ชจ์ธ display ๋ฐ์ค๋ฅผ ์ฑ์.

    ```javascript
    function setDisplay() {
      for (let i = 0; i < level + 1; i++) {
        const row = document.createElement('div');
        row.style.height = `${100 / (level + 1)}%`;

        for (let j = 0; j < level + 1; j++) {
          const rowItem = document.createElement('div');
          ...
          rowItem.style.width = `${100 / (level + 1)}%`;
          ...
          row.appendChild(rowItem);
        }
        display.appendChild(row);
      }
    }
    ```

- ๊ฐ์ค์น ๋ณ์ k๋ฅผ ๋ง๋ค๊ณ  ๊ฐ์ค์น์ ๋ฐ๋ผ ์์์ ์ฐจ์ด๊ฐ ์ ์์ง๋๋ก ๊ตฌํํ์ฌ base์์๊ณผ ๋น์ทํ ํค์ด๋ฉด์ ๋ ๋ฒจ์ด ๋์์ง์๋ก base์์๊ณผ์ ์ฐจ์ด๊ฐ ์ ์ด์ง๋ ์์์ ๋์ถ

  - ํ๊ฒ ์์ ์ค์  ํจ์

    ```javascript
    function setTarget() {
      ...
      // ํ๊ฒ ์ปฌ๋ฌ ์ค์ 
      // ๊ฐ์ค์น k ์ ๋ฐ๋ผ baseColor ์์ ์ฐจ์ด ์กฐ์ 
      let k = 75 / level + 3;

      // colorPoint = ~~(360 * Math.random()) -> setBaseColor()์์ ํ ๋น
      if (colorPoint - k < 0) colorPoint += k;
      else colorPoint -= k;
      targetColor = `hsla(${colorPoint},70%,70%,0.8)`;
    }
    ```

  - k = 75 / level + 3 ๊ทธ๋ํ
    ![๊ทธ๋ํ](https://user-images.githubusercontent.com/66201264/161114118-fa967f1d-1450-4080-b70c-749d21bfb36b.png)

- ๋์ด๋ ๊ด๋ จ ๊ฐ์ค์น๋ฅผ ์กฐ์ ํ๊ณ  stage์ ๋ฐ๋ผ level์ด ๋ ๋น ๋ฅด๊ฒ ์ค๋ฅด๋๋ก ์์ ํ์ฌ ๋์ด๋ ์กฐ์  ํผ๋๋ฐฑ ์์ฉ
  - ๊ธฐ์กด 7 : 1 ์์ 5 : 1 ๋ก ์์ 
  ```javascript
    // ๋ ๋ฒจ์ด ์ฌ๋ผ๊ฐ๋ ์คํ์ด์ง ๋จ์
    // 5 stage ๋ง๋ค level++
    const levelUpCount = 5;
  ```
