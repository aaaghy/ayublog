import { siteConfig } from "@/siteConfig";

export default function ProfileCard({
  postCount = 0,
  chatterCount = 0,
  photoCount = 0,
}: {
  postCount?: number;
  chatterCount?: number;
  photoCount?: number;
}) {
  return (
    <div
      className="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-5 md:p-8 flex flex-col justify-between transition-all duration-700 group relative overflow-hidden w-full h-full min-h-[200px] md:min-h-[280px]"
    >
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-400 to-purple-400 p-[3px] shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-110 hover:rotate-6 cursor-pointer">
              <img
                src={siteConfig.avatarUrl}
                alt="avatar"
                className="w-full h-full rounded-full object-cover bg-white dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2 tracking-wider transition-colors duration-700">
              {siteConfig.authorName}
            </h1>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-md transition-colors duration-700">
              {siteConfig.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-end md:items-center justify-between mt-4 md:mt-8 gap-4 md:gap-6 relative z-10">
        <div className="flex gap-6 w-full md:w-auto justify-around md:justify-start">
          <StatItem
            count={postCount}
            label="文章"
            color="text-indigo-600 dark:text-indigo-400"
          />
          <div className="w-px h-10 bg-slate-300/50 dark:bg-slate-700 hidden md:block" />
          <StatItem
            count={chatterCount}
            label="说说"
            color="text-purple-600 dark:text-purple-400"
          />
          <div className="w-px h-10 bg-slate-300/50 dark:bg-slate-700 hidden md:block" />
          <StatItem
            count={photoCount}
            label="照片"
            color="text-pink-600 dark:text-pink-400"
          />
        </div>

      </div>
    </div>
  );
}

function StatItem({
  count,
  label,
  color,
}: {
  count: number;
  label: string;
  color: string;
}) {
  return (
    <div className="text-center group/stat">
      <div
        className={`text-xl md:text-2xl font-black ${color} transition-transform group-hover/stat:scale-110`}
      >
        {count}
      </div>
      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
