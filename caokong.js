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
const firstPic = new Picture('../tankWorld/images/开始.jpg', 0, 0, 600, 600)
const selectGameModelPic = new Picture('../tankWorld/images/qidong.png', 200, 365, 30, 30)
const secondPic = new Picture('../tankWorld/images/jiemian.png', 0, 0, 600, 600)

//画画对象
function drawpic(pic) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = pic.src
    //img.crossOrigin = 'anonymous'
    img.onload = function () {
      ctx.drawImage(img, pic.x, pic.y, pic.w, pic.h)
      resolve(img)
    }
  })
}

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

//游戏运行的函数
function gamestart() {
  console.log('这是第' + level + '关，难度系数' + moveSelect)
  ctx.clearRect(75, 75, 450, 450)
}

const keyhandler1 = (e) => {
  //阻止上下键控制窗口
  console.log(this.e)
  e.preventDefault()
  if (jiemian == 1) {
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
        gamestart()
      }, 2000)
    }
  }
}

document.addEventListener('keydown', keyhandler1)

//主函数
function main() {
  console.log(jiemian)
  switch (jiemian) {
    case 0:
      ctx.clearRect(0, 0, 600, 600)
      break
    case 1:
      drawpic(firstPic)
      drawpic(selectGameModelPic)
    case 2:
  }
  window.requestAnimationFrame(main)
}
window.requestAnimationFrame(main)
