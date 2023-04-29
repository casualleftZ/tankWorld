//定义的参数
let moveSelect = 1

/*获取画布的信息 */
const canvas = document.getElementById('#count')
var c = canvas.getContext('2d')

/*定义图片*/
const firstPic = new Picture('../tankWorld/images/开始.jpg', 0, 0, 600, 600)
const selectGameModelPic = new Picture('../tankWorld/images/qidong.png', 200, 365, 30, 30)

/**
 *
 * 坦克的速度 moveSpeed
 * 坦克子弹的速度  fireSpeed
 * 坦克子弹的类型  fireType
 * 坦克子弹的大小倍数 fireMultiple
 * 坦克子弹的反弹次数 fireReboundTimes
 * 坦克子弹打出方向  fireDirection
 * 坦克的图片 tankImages
 */

//所有的坦克
function Tank(moveSpeed, fireSpeed, fireType, fireMultiple, fireReboundTimes, fireDirection, tankImages) {
  this.moveSpeed = moveSpeed
  this.fireSpeed = fireSpeed
  this.fireType = fireType
  this.fireMultiple = fireMultiple
  this.fireReboundTimes = fireReboundTimes
  this.fireDirection = fireDirection
  this.tankImages = tankImages
}
function MyTank(moveSpeed, fireSpeed, fireType, fireMultiple, fireReboundTimes, fireDirection, tankImages) {
  Tank.call(this, moveSpeed, fireSpeed, fireType, fireMultiple, fireReboundTimes, fireDirection, tankImages)
  this.move = function () {}
}
/**
 *
 * @param {*图片路径} src
 * @param {*图片起始点坐标x} x
 * @param {*图片起始点坐标y} y
 * @param {*图片宽度} w
 * @param {*图片高度} h
 */
function Picture(src, x, y, w, h) {
  this.src = src
  this.x = x
  this.y = y
  this.w = w
  this.h = h
}

// 图片导入函数
/*
 *  参数
 * src 图片路径
 * x,y 图片起始点坐标
 * w,h 图片的场合宽
 */
function drawpic(pic) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    //img.crossOrigin = 'anonymous'
    img.onload = function () {
      c.drawImage(img, pic.x, pic.y, pic.w, pic.h)
      resolve(img)
    }
    img.src = pic.src
  })
}
//检测开始界面按键
const keyhandler1 = (e) => {
  //阻止上下键控制窗口
  // console.log(e)
  e.preventDefault()
  const { code, keyCode } = e
  // const isLeft = code === 'ArrowLeft' || keyCode === 37
  const isTop = code === 'ArrowUp' || keyCode === 38 || keyCode === 87 || keyCode === 199
  // const isRight = code === 'ArrowRight' || keyCode === 39
  const isDown = code === 'ArrowDown' || keyCode === 40 || keyCode === 83 || keyCode === 155

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
}

//获取开始按钮
const start = document.querySelector('#start')

start.addEventListener('click', function () {
  c.clearRect(0, 0, 600, 600)
  var img = new Image()
  img.src = '../坦克大战/images/开始.jpg'
  img.onload = function () {
    c.drawImage(img, 0, 0, 600, 600)
  }

  drawpic(firstPic)
  // 在这之后才能继续绘制其他图片
  drawpic(selectGameModelPic)

  document.addEventListener('keydown', keyhandler1)
})
