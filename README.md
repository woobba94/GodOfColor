# GodOfColor

💡 JavaScript를 연습하기 위해 만든 간단한 게임 서비스입니다. 난이도 조절을 효율적으로 하기 위해 고민하였고 레벨별 박스 크기와 색상을 변화시키는 과정을 구현해보았습니다. 이론상 무한한 스테이지를 만들어 주변인들도 만족했던 서비스입니다.

## 0. Release.

[Link](https://god-of-color.netlify.app/)

## 1. Tech stack.

HTML | CSS | JavaScript

## 2. Details.

- 중첩 flex구조로 만든 후 level 변수에 따라 내부 width, height를 산출하는 방식으로 레벨에 따라 상자크기를 알맞게 변경.

  - level 변수에 따라 한 행의 높이값 설정.
    ```javascript
    const row = document.createElement('div');
    row.style.height = `${100 / (level + 1)}%`;
    ```
  - 한 행에 들어갈 박스의 width값 설정
    ```javascript
    const rowItem = document.createElement('div');
    rowItem.style.width = `${100 / (level + 1)}%`;
    ```
  - 2중 for문으로 부모인 display 박스를 채움.

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

- 가중치 변수 k를 만들고 가중치에 따라 색상의 차이가 적아지도록 구현하여 base색상과 비슷한 톤이면서 레벨이 높아질수록 base색상과의 차이가 적어지는 색상을 도출

  - 타겟 색상 설정 함수

    ```javascript
    function setTarget() {
      ...
      // 타겟 컬러 설정
      // 가중치 k 에 따라 baseColor 와의 차이 조절
      let k = 75 / level + 3;

      // colorPoint = ~~(360 * Math.random()) -> setBaseColor()에서 할당
      if (colorPoint - k < 0) colorPoint += k;
      else colorPoint -= k;
      targetColor = `hsla(${colorPoint},70%,70%,0.8)`;
    }
    ```

  - k = 75 / level + 3 그래프
    ![그래프](https://user-images.githubusercontent.com/66201264/161114118-fa967f1d-1450-4080-b70c-749d21bfb36b.png)

- 난이도 관련 가중치를 조정하고 stage에 따라 level이 더 빠르게 오르도록 수정하여 난이도 조절 피드백 수용
  - 기존 7 : 1 에서 5 : 1 로 수정
  ```javascript
  // 레벨이 올라가는 스테이지 단위
  // 5 stage 마다 level++
  const levelUpCount = 5;
  ```
