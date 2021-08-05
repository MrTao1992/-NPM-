
import { BaseMgr } from 'zmg_mgr';

declare global {
    namespace zmg {
        interface IAudioMgr extends zmg.IMgr {
            /**
             * 当前音乐是否正在播放中
             */
            readonly isMuiscPlaying: boolean;

            /**
             * 
             * @param clip 播放音效
             * @param callback 回调函数
             * @param target 播放对象（检测是否合法）
             * @param count 播放次数
             * @param alone 是否屏蔽其他音效进行播放
             */
            playEffect(clip: cc.AudioClip, callback: Function, target: any, count: number, alone: boolean): void;
            /**
             * 
             * @param clip 播放音乐
             * @param callback 回调函数
             * @param target 播放对象
             * @param count 播放次数
             */
            playMusic(clip: cc.AudioClip, callback: Function, target: any, count: number,): void;
            /**
             * 设置音效音量
             * IOS暂时无效
             * @param value 
             */
            setEffectVolume(value: number): void;
            /**
             * 设置背景音量
             * IOS暂时无效
             * @param value 
             */
            setMusicVolume(value: number): void;
            /**
             * 停止所有音量
             */
            stopAllEffect(): void;
            /**
             * 停止所有背景音乐
             */
            stopAllMusic(): void;
            /**
            * 声音文件是否合法
            * @param clip 
            */
            isValidClip(clip: cc.AudioClip): boolean;
            /**
            * 声音是否存在
            * @param clip 声音文件
            */
            hasEffect(clip: cc.AudioClip): boolean;
            /**
            * 停止音乐
            * @param clip 音频
            */
            stopMusic(clip?: cc.AudioClip): void;
            /**
            * 暂停所有音乐
            */
            pauseAllMusic(): void;
            /**
            * 恢复所有音乐
            */
            resumeAllMusic(): void;
            /**
            *  停止音效
            * @param clip 
            */
            stopEffect(clip: cc.AudioClip): void;
            /**
            * 暂停特效音频
            * @param clip 音频
            */
            pauseEffect(clip: cc.AudioClip): void;
            /**
            * 暂停所有特效音频
            */
            pauseAllEffect(): void;
            /**
            * 恢复特效音频
            * @param clip 音频
            */
            resumeEffect(clip: cc.AudioClip): void;
            /**
            * 恢复所有特效音频
            */
            resumeAllEffect(): void;
            /**
            * 停止所有音频
            */
            stopAll(): void;
            /**
            * 暂停所有音频
            */
            pauseAll(): void;
            /**
            * 恢复所有音频
            */
            resumeAll(): void;
        }
    }
}
export { }