//显示界面的面数
let jiemian = 0

//选择难度参数
let moveSelect = 1
//进行关卡
let level = 1

/*获取画布*/
const canvas = document.querySelector('#count')
var ctx = canvas.getContext('2d')

/**
 *
 * @param {*图片路径} src
 * @param {*图片起始点坐标x} x
 * @param {*图片起始点坐标y} y
 * @param {*图片宽度} w
 * @param {*图片高度} h
 */

class Picture {
  constructor(src, x, y, w, h) {
    this.src = src
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
}

//定义图片
const firstPic = new Picture('images/开始.jpg', 0, 0, 600, 600)
const selectGameModelPic = new Picture('images/qidong.png', 200, 365, 30, 30)
const secondPic = new Picture('images/jiemian.png', 0, 0, 600, 600)

//画画对象
function drawpic(pic) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.src = pic.src
    //img.crossOrigin = 'anonymous'
    img.onload = function () {
      ctx.drawImage(img, pic.x, pic.y, pic.w, pic.h)
      resolve(img)
    }
  })
}

/*
    *定义物理块
    *src 图片路径
    *blood 血量
    *hardness 硬度
    *collision碰撞体积

*/
class Block {
  constructor(src, blood, hardness, collision) {
    this.src = src
    this.blood = blood
    this.hardness = hardness
    this.collision = collision
    // this.x = x * 15 + 75
    // this.y = y * 15 + 75
  }
  draw(x, y) {
    var img = new Image()
    img.src = this.src
    ctx.drawImage(img, x * 20 + 80, y * 20 + 80, 20, 20)
    console.log('我被调用了')
  }
}

/*
 * 定义地图
 *
 */
let level1_Map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 0, 0],
  [0, 0, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 0, 0],
  [0, 0, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

//定义关卡数
const MAX_LEVEL = 2

//手写地图参数
let map = new Array(22)
for (var i = 0; i < map.length; i++) {
  map[i] = new Array(22)
}
function initMap(level) {
  var arr = eval('level' + level + '_Map')
  for (i = 0; i < 22; i++) {
    for (var j = 0; j < 22; j++) {
      switch (arr[i][j]) {
        case 0:
          //ctx.fillRect(i * 20 + 80, j * 20 + 80, 20, 20)
          map[i][j] = new Block('images/wall3.jpg', 0, 0, 0)
          break
        case 1:
          map[i][j] = new Block('images/wall2.jpg', 10, 1, 0)
          //map[i][j].draw(i, j)
          break
        case 2:
          map[i][j] = new Block('images/wall1.jpg', 10, 2, 0)
          //white_Block.draw(i, j)
          break
        default:
          throw new Error('地图参数错误')
      }
    }
  }
  return map
}

/*
 *定义坦克
 *坦克血量
 *
 */

/*获取开始按钮*/
const startButton = document.querySelector('#startButton')

startButton.addEventListener('click', function () {
  jiemian = 1
  //初始化选择难度和等级
  level = 1
  moveSelect = 1
  selectGameModelPic.x = 200
  selectGameModelPic.y = 365
  console.log(jiemian)
})

const endButton = document.querySelector('#endButton')
endButton.addEventListener('click', function () {
  jiemian = 0
  console.log(jiemian)
})

const keyhandler1 = (e) => {
  //阻止上下键控制窗口

  e.preventDefault()

  const { code, keyCode } = e
  // const isLeft = code === 'ArrowLeft' || keyCode === 37
  const isTop = code === 'ArrowUp' || keyCode === 38 || keyCode === 87 || keyCode === 199
  // const isRight = code === 'ArrowRight' || keyCode === 39
  const isDown = code === 'ArrowDown' || keyCode === 40 || keyCode === 83 || keyCode === 155
  const queren = code === 'Enter' || keyCode === 13
  // const isNext = isRight || isDown
  // const isPre = isLeft || isTop

  if (isTop) {
    console.log('我上了')
    if (selectGameModelPic.y > 365) {
      selectGameModelPic.y -= 45
      // c.clearRect(0, 0, 600, 600)
      drawpic(firstPic)
      // 在这之后才能继续绘制其他图片
      drawpic(selectGameModelPic)
      moveSelect--
      console.log(moveSelect)
    }
  }
  if (isDown) {
    console.log('我下了')
    if (selectGameModelPic.y < 460) {
      selectGameModelPic.y += 45
      //c.clearRect(0, 0, 600, 600)
      drawpic(firstPic)
      //在这之后才能继续绘制其他图片
      drawpic(selectGameModelPic)
      moveSelect++
      console.log(moveSelect)
    }
  }
  if (queren) {
    jiemian = 2
    console.log('你按了确认键')
    ctx.clearRect(0, 0, 600, 600)
    drawpic(secondPic)
    ctx.font = '15px Arial'
    ctx.fillText('欢迎来到第' + level + '关', 240, 280)

    const gogo = window.setTimeout(function () {
      jiemian = 3
      ctx.clearRect(80, 80, 440, 440)
    }, 2000)
  }
}

//主函数
function main() {
  console.log(jiemian)
  switch (jiemian) {
    case 0:
      ctx.clearRect(0, 0, 600, 600)
      break
    case 1:
      {
        drawpic(firstPic)
        drawpic(selectGameModelPic)
        document.addEventListener('keydown', keyhandler1)
      }
      break
    case 3:
      {
        //定义地图刷新开关
        let mapReflash = 0

        console.log(jiemian)
        if (mapReflash == 0) {
          //ctx.clearRect(80, 80, 440, 440)
          var mapArr = initMap(level)
          mapReflash = 1

          for (i = 0; i < 22; i++) {
            for (var j = 0; j < 22; j++) {
              mapArr[i][j].draw(i, j)
              console.log('我打印了图片')
            }
          }
        }
      }
      break
  }

  window.requestAnimationFrame(main)
}
window.requestAnimationFrame(main)
