// Variabel
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//fungsi update warna canvas

let iconPemain = new Image();
iconPemain.src = 'tank.png';

let iconMusuh = new Image();
iconMusuh.src = 'monster.png';

let iconPeluru = new Image();
iconPeluru.src = 'laser.png';

let iconLedakan = new Image();
iconLedakan.src = 'blast.png';

const backsound = new Audio('backsound.mp3');
backsound.loop = true;
backsound.autoplay = true;


let skor = 0;
function tambahScore() {
  skor += 5;
document.getElementById('score').textContent = `score:  ${skor}`;
}


let pemain = {
  x: 140,
  y: 120,
  lebar: 23,
  tinggi: 12,
  kecepatan: 3
};

// buat exp untuk karakter
let exp = 0;
let persentase = 0.3;
let level = 1;

function tambahExp() {
  if(Math.random() < persentase) {
    exp += 20;
    console.log("mendapatkan +20 exp dari musuh!");
    cekLevel();
  }
}

function cekLevel() {
  if (exp >= 2550) {
    level = 10;
  } else if (exp >= 2100) {
    level = 9;
  } else if (exp >= 1700) {
    level = 8;
  } else if (exp >= 1250) {
    level = 7;
  } else if (exp >= 1000) {
    level = 6;
  } else if (exp >= 500) {
    level = 5;
  } else if (exp >= 250) {
    level = 4;
  } else if(exp >= 100) {
    level = 3;
  } else if(exp >= 60) {
    level = 2;
  }
  document.getElementById("level").textContent = `Level ${level}`;
  ability();
}

function ability() {
  if (level == 2) {
    peluru.kecepatan += 1;
    } else if(level == 3) {
      peluru.kecepatan += 3;
    } else if(level == 4) {
      peluru.kecepatan += 4;
    } else if (level == 5) {
      peluru.kecepatan += 4;
    } else if (level == 6) {
      peluru.kecepatan += 4;
    } else if (level == 7) {
      peluru.kecepatan += 4;
    } else if (level == 8) {
      peluru.kecepatan += 4;
    } else if (level == 9) {
      peluru.kecepatan += 4;
    } else if (level == 10) {
      peluru.kecepatan += 4;
    }
  }  

let peluru = [];
let musuh = []; // Deklarasi array musuh
// Membuat musuh
function buatMusuh() {
  let musuhBaru = {
    x: Math.random() * (canvas.width -20),
    y: 0,
    lebar: 24,
    tinggi: 10,
    kecepatan: Math.random() * 1 + 0.1
  };
  musuh.push(musuhBaru); // Menambahkan musuh ke array
}

// Menggambar musuh
function gambarMusuh() {
  musuh.forEach((musuh) => {
    ctx.drawImage(iconMusuh, musuh.x, musuh.y, musuh.lebar, musuh.tinggi);
  });
}

// Memperbarui musuh
function updateMusuh() {
  for (let i = musuh.length - 1; i >= 0; i--) {
    musuh[i].y += musuh[i].kecepatan;
    if (musuh[i].y > canvas.height) {
      gameOver();
      return;
    }
  }
}

// Membuat peluru
function buatPeluru() {
  let peluruBaru = {
    x: pemain.x +  2,
    y: pemain.y - 12,
    lebar: 19,
    tinggi: 15,
    kecepatan: 5
  };
  peluru.push(peluruBaru);
}

// Menggambar peluru
function gambarPeluru() {
  peluru.forEach((peluru) => {
    ctx.drawImage(iconPeluru, peluru.x, peluru.y, peluru.lebar, peluru.tinggi);
  });
}

// Memperbarui peluru
function updatePeluru() {
  for (let i = peluru.length - 1; i >= 0; i--) {
    peluru[i].y -= peluru[i].kecepatan;
    if (peluru[i].y < 0) {
      peluru.splice(i, 1);
    } else {
      for (let j = musuh.length - 1; j >= 0; j--) {
        if (
          peluru[i].x + peluru[i].lebar > musuh[j].x &&
          peluru[i].x < musuh[j].x + musuh[j].lebar &&
          peluru[i].y + peluru[i].tinggi > musuh[j].y &&
          peluru[i].y < musuh[j].y + musuh[j].tinggi
        ) {
          buatLedakan(musuh[j].x + musuh[j].lebar / 2, musuh[j].y + musuh[j].tinggi / 2);
          musuh.splice(j, 1);
          peluru.splice(i, 1);
          tambahScore();
          tambahExp();
          return;
        }
      }
    }
  }
}
  
//membuat ledakan
let ledakan = [];
function buatLedakan(x, y) {
  ledakan.push({ x: x - 13, y: y - 15, lebar: 25, tinggi: 30, waktu: 10 });
}

//fungsi gambar ledakan
function gambarLedakan() {
  ledakan.forEach((ledakan) => {
    ctx.drawImage(iconLedakan, ledakan.x, ledakan.y, ledakan.lebar, ledakan.tinggi);
  });
}

//fungsi update ledakan
function updateLedakan() {
  for(let i = ledakan.length - 1; i >= 0; i--) {
    ledakan[i].waktu--;
    if (ledakan[i].waktu <= 0) {
      ledakan.splice(i, 1);
    }
  }
}

// Menggambar pemain
function gambarPemain() {
  ctx.drawImage(iconPemain, pemain.x, pemain.y, pemain.lebar, pemain.tinggi);
}

//fungsi update pemain
function updatePemain() {
  if (kontrol.maju) pemain.y -= pemain.kecepatan;
  if (kontrol.mundur) pemain.y += pemain.kecepatan;
  if (kontrol.kanan) pemain.x += pemain.kecepatan;
  if (kontrol.kiri) pemain.x -= pemain.kecepatan;
  if (pemain.x < 0) pemain.x = 0;
  if (pemain.x + pemain.lebar > canvas.width) pemain.x = canvas.width - pemain.lebar;
  if (pemain.y < 0) pemain.y = 0;
  if (pemain.y + pemain.tinggi > canvas.height) pemain.y = canvas.height - pemain.tinggi;
}

// Fungsi Game Over
function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "25px sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("NT Coba Lagi", canvas.width / 2, canvas.height / 2 - 15);
  ctx.fillText("SCORE: " + skor, canvas.width / 2, canvas.height / 2 + 20);
  clearInterval(intervalMusuh);
  clearInterval(intervalPeluru);
  cancelAnimationFrame(main);
}

let intervalMusuh = setInterval(buatMusuh, 1000);
let intervalPeluru = setInterval(buatPeluru, 400);

/* kontrol pemain*/
// Event Tombol
let kontrol = {
  maju: false,
  mundur: false,
  kanan: false,
  kiri: false
};

document.getElementById('maju').addEventListener('touchstart', () => kontrol.maju = true);
document.getElementById('maju').addEventListener('touchend', () => kontrol.maju = false);

document.getElementById('mundur').addEventListener('touchstart', () => kontrol.mundur = true);
document.getElementById('mundur').addEventListener('touchend', () => kontrol.mundur = false);

document.getElementById('kanan').addEventListener('touchstart', () => kontrol.kanan = true);
document.getElementById('kanan').addEventListener('touchend', () => kontrol.kanan = false);

document.getElementById('kiri').addEventListener('touchstart', () => kontrol.kiri = true);
document.getElementById('kiri').addEventListener('touchend', () => kontrol.kiri = false);

// Main loop
function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 gambarPemain();
 gambarMusuh();
 gambarLedakan();
 updateMusuh();
 gambarPeluru();
 updatePeluru();
 updateLedakan();
 updatePemain();
 backsound.play();
 requestAnimationFrame(main);
}

// Inisialisasi permainan
intervalPeluru;
intervalMusuh;
main();