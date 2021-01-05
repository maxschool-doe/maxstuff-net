function update () {
	url="https://render.namemc.com/skin/3d/body.png?skin="+skinid.value+"&model=classic&theta="+horizontalrot.value+"&phi="+verticalrot.value+"&time="+time.value+"&width=1600&height=800";
  output.src = url;
  outputlink.href = url;
}

skinid.oninput = update;
horizontalrot.oninput = update;
verticalrot.oninput = update;
time.oninput = update;

update();