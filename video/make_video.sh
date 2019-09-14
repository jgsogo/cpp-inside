gource --file-idle-time 0\
    -s .06 \
    -1440x900 \
    --auto-skip-seconds .1 \
    --multi-sampling \
    --stop-at-end \
    --key \
    --highlight-users \
    --hide mouse,progress \
    --file-idle-time 0 \
    --max-files 0  \
    --background-colour 000000 \
    --font-size 22 \
    --output-ppm-stream - \
    --output-framerate 30 \
    | avconv -y -r 30 -f image2pipe -vcodec ppm -i - -b 65536K movie.mp4
ffmpeg -i movie.mp4 -vcodec libx264 -acodec aac output.mp4
rm movie.mp4
