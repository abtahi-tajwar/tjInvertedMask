//tjFancyCursor(70, 70, "gray");

/* Important code storage
  document.querySelector("#clipper").setAttribute("cx", event.clientX - leftSize);
  document.querySelector("#clipper").setAttribute("cy", event.clientY - topSize);
*/

let topSize = document.querySelector(".tjInvertedMask").offsetTop;
let leftSize = document.querySelector(".tjInvertedMask").offsetLeft;

function setClipperToPosition(tjCursor, event = null)
{
  if(tjCursor == 1) {
    document.querySelector(".tjInvertedMaskinner #clipper").setAttribute("cx", document.querySelector(".tj-cursor").offsetLeft - leftSize+35);
    document.querySelector(".tjInvertedMaskinner #clipper").setAttribute("cy", document.querySelector(".tj-cursor").offsetTop - topSize+35);
  }
  else {
    document.querySelector("#clipper").setAttribute("cx", event.clientX - leftSize);
    document.querySelector("#clipper").setAttribute("cy", event.clientY - topSize);
  }

}
function initInvertedMask(text, color, startWidth)
{
  document.querySelector(".tjInvertedMask").innerHTML = `
    <p>${text}</p>
    <div class="tjInvertedMaskinner">
      <p>${text}</p>
      <svg height="100%" width="100%">
        <defs>
          <clipPath id="clip">
            <circle id="clipper" cx="50%" cy="50%" r= ${startWidth} />
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="hover_inner"></div>
  `;
  console.log(document.querySelector(".tjInvertedMask").style.backgroundColor);
  //document.querySelector(".tjInvertedMask").style.backgroundColor = color.primary;
  //document.querySelector(".tjInvertedMask").style.webkitTextStroke = color.secondary;
}
function tjInvertedMask(cursor = "tj-cursor", text, radius = 45, color = {primary: "white", secondary: "black"}, startWidth = 35)
{
    let tjCursorExists;
    if(cursor === 'tj-cursor') {
      tjCursorExists = 1;
      startWidth = (document.querySelector(".tj-cursor").offsetWidth)/2;
    }
    else {
      tjCursorExists = 0;
      startWidth = 35;
    }
    console.log(startWidth);
    initInvertedMask(text, color, startWidth);

    document.querySelector(".tjInvertedMask .hover_inner").addEventListener("mouseover", (event) => {
      document.querySelector(".tjInvertedMask").style.color = "black";
      if(tjCursorExists === 1) {
        document.querySelector(".tj-cursor").style.opacity = "0";
        //Under Development
        document.querySelector(".tj-cursor").style.transform = "scale("+(radius/startWidth)+")";
      }
      if(tjCursorExists === 1) {
        setClipperToPosition(1);
      }
      else {
        setClipperToPosition(0, event);
      }
      document.querySelector("html").style.cursor = "none";
      document.querySelector(".tjInvertedMaskinner").style.opacity = "1";
      document.querySelector(".tjInvertedMask #clipper").style.opacity = "1";
      //Under Development
      document.querySelector(".tjInvertedMask #clipper").style.transform = "scale("+(radius/startWidth)+")";
      document.querySelector(".tjInvertedMask .hover_inner").addEventListener("mousemove", (event)=> {
        if(tjCursorExists === 1) {
          setClipperToPosition(1);
        }
        else {
          setClipperToPosition(0, event);
        }

        document.querySelector(".tjInvertedMask .hover_inner").addEventListener("mouseout", () => {
          document.querySelector("html").style.cursor = "default";
          document.querySelector(".tjInvertedMask #clipper").style.opacity = "0";
          document.querySelector(".tjInvertedMask #clipper").style.transform = "scale(1)";
          document.querySelector(".tjInvertedMaskinner").style.opacity = "0";
          if(tjCursorExists === 1) {
            document.querySelector(".tj-cursor").style.opacity = "1";
            document.querySelector(".tj-cursor").style.transform = "scale(1)";
          }
          document.querySelector(".tjInvertedMask").style.color = "transparent";
      })
    })
  })
}
tjInvertedMask("", "work");
