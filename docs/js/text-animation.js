/** Taken and adapted from https://github.com/paambaati/rendering-at-scale */

const delay_default = 2;
const step = 1;
const tail = 5;
const timeout_default = 50;

const colors = [
  "rgb(110,64,170)",
  "rgb(150,61,179)",
  "rgb(191,60,175)",
  "rgb(228,65,157)",
  "rgb(254,75,131)",
  "rgb(255,94,99)",
  "rgb(255,120,71)",
  "rgb(251,150,51)",
  "rgb(226,183,47)",
  "rgb(198,214,60)",
  "rgb(175,240,91)",
  "rgb(127,246,88)",
  "rgb(82,246,103)",
  "rgb(48,239,130)",
  "rgb(29,223,163)",
  "rgb(26,199,194)",
  "rgb(35,171,216)",
  "rgb(54,140,225)",
  "rgb(76,110,219)",
  "rgb(96,84,200)"
];

function animate_element(element) {
  // This is the 'text-animation-wrapper' element
  const prefix = element.attr("prefix");
  const delay = element.attr("delay") || delay_default;
  const timeout = element.attr("timeout") || timeout_default;
  const alternates = element.find("span").map(function() { return $(this).text() + "   ";}).get();
  console.log(alternates);
  const p = element.find('.text-animation')[0];

  const text_animation_data = {
    text: "",
    prefixP: -tail,
    skillI: 0,
    skillP: 0,
    direction: "forward",
    delay,
    step,
    stop: false
  };

  render(p, prefix, alternates, text_animation_data, delay, timeout);
  return text_animation_data;
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomChar() {
  return String.fromCharCode(Math.random() * (127 - 33) + 33);
}
function getRandomColoredString(n) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const char = document.createElement("span");
    char.textContent = getRandomChar();
    char.style.color = getRandomColor();
    fragment.appendChild(char);
  }
  return fragment;
}

function render(element, prefix, alternates, text_animation_data, delay, timeout) {
  if (text_animation_data.stop) return;

  const skill = alternates[text_animation_data.skillI];

  if (text_animation_data.step) {
    text_animation_data.step--;
  } else {
    text_animation_data.step = step;
    if (text_animation_data.prefixP < prefix.length) {
      if (text_animation_data.prefixP >= 0) {
        text_animation_data.text += prefix[text_animation_data.prefixP];
      }
      text_animation_data.prefixP++;
    } else {
      if (text_animation_data.direction === "forward") {
        if (text_animation_data.skillP < skill.length) {
          text_animation_data.text += skill[text_animation_data.skillP];
          text_animation_data.skillP++;
        } else {
          if (text_animation_data.delay) {
            text_animation_data.delay--;
          } else {
            text_animation_data.direction = "backward";
            text_animation_data.delay = delay;
          }
        }
      } else {
        if (text_animation_data.skillP > 0) {
          text_animation_data.text = text_animation_data.text.slice(0, -1);
          text_animation_data.skillP--;
        } else {
          text_animation_data.skillI = (text_animation_data.skillI + 1) % alternates.length;
          text_animation_data.direction = "forward";
        }
      }
    }
  }

  element.textContent = text_animation_data.text
  element.appendChild(
    getRandomColoredString(
      text_animation_data.prefixP < prefix.length
        ? Math.min(tail, tail + text_animation_data.prefixP)
        : Math.min(tail, skill.length - text_animation_data.skillP)
    )
  );  
  setTimeout(function() {
      render(element, prefix, alternates, text_animation_data, delay, timeout)
    }, timeout);
}
