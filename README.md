# 🎵 hailuo-music

海螺（MiniMax）`music-3.0-free` 模型生成的两首音乐示例。

| 文件 | 风格 | 时长 | 大小 | 描述 |
|---|---|---|---|---|
| [`music_mj_ai.mp3`](./music_mj_ai.mp3) | 1980s pop / Michael Jackson 风 | 2:26 | 4.69 MB | AI 主题，Funky + slap bass + finger snaps |
| [`music_ocean.mp3`](./music_ocean.mp3) | Ambient / 海浪冥想 | 1:32 | 2.94 MB | 氛围电子 + 中文人声，慢板 |

## 生成参数

两首都使用：
- 模型：`music-3.0-free`
- 端点：`POST https://api.minimaxi.com/v1/music_generation`
- 采样率 44100 Hz / 256 kbps / 立体声 / MP3
- 无水印（`aigc_watermark: false`）

## 关于 music_mj_ai.mp3

模仿 MJ 风格，主题是"AI"。歌词包含 `[intro]` / `[verse]` / `[pre chorus]` / `[chorus]` / `[bridge]` / `[outro]` 六段，bridge 段含 scat 哼唱。模型不会真采样 MJ 人声，所谓的"MJ 风格"是 prompt 里风格特征（funk / slap bass / disco / finger snaps）在配器层面的近似。

## 关于 music_ocean.mp3

环境氛围 + 中文人声主题。带 `[intro]` / `[verse]` / `[chorus]` / `[outro]` 结构标签，让人声段做留白处理，贴合冥想氛围。

## 免责声明

音乐由 AI 生成，版权与商用限制以 MiniMax / 海螺平台条款为准。