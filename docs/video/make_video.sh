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
    --file-filter docs/fontawesome \
    --file-filter docs/lib \
    --file-filter docs/plugin \
    --file-filter docs/test \
    --file-filter docs/css/theme \
    --file-filter docs/css/print \
    --file-filter doc/fontawesome \
    --file-filter doc/lib \
    --file-filter doc/plugin \
    --file-filter doc/test \
    --file-filter doc/css/theme \
    --file-filter doc/css/print \
    --filename-time 100 \
    | avconv -y -r 30 -f image2pipe -vcodec ppm -i - -b 65536K movie.mp4
ffmpeg -i movie.mp4 -vcodec libx264 -acodec aac video/cpp_inside.mp4
rm movie.mp4
