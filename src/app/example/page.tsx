import EyeShow from '@/assets/icons/eye_show.svg';
import EyeHide from '@/assets/icons/eye_hide.svg';
import AI from '@/assets/icons/ai.svg';
import Arrow from '@/assets/icons/arrow.svg';
import Calendar from '@/assets/icons/calendar.svg';
import Cn from '@/assets/icons/cn.svg';
import Down from '@/assets/icons/down.svg';
import Edit from '@/assets/icons/edit.svg';
import Fab from '@/assets/icons/fab.svg';
import Fr from '@/assets/icons/fr.svg';
import Jp from '@/assets/icons/jp.svg';
import Kr from '@/assets/icons/kr.svg';
import Plus from '@/assets/icons/plus.svg';
import Refresh from '@/assets/icons/refresh.svg';
import Search from '@/assets/icons/search.svg';
import Time from '@/assets/icons/time.svg';
import Translate from '@/assets/icons/translate.svg';

export default function Test() {
  return (
    <>
      <div className="flex gap-2">
        <EyeShow className="text-success-100 w-6 h-6" />
        <EyeHide className="text-secondary-800 w-6 h-6" />
        <AI className="text-secondary-800 w-6 h-6" />
        <Arrow className="text-secondary-800 w-6 h-6" />
        <Calendar className="text-secondary-800 w-6 h-6" />
        <Cn className="text-secondary-800" />
        <Down className="text-secondary-800 w-6 h-6" />
        <Edit className="text-secondary-800 w-6 h-6" />
        <Fab className="text-secondary-800 w-6 h-6" />
        <Fr className="text-secondary-800" />
        <Jp className="text-secondary-800" />
        <Kr className="text-secondary-800" />
        <Plus className="text-secondary-800 w-6 h-6" />
        <Refresh className="text-secondary-800 w-6 h-6" />
        <Search className="text-secondary-800 w-6 h-6" />
        <Time className="text-secondary-800 w-6 h-6" />
        <Translate className="text-secondary-800 w-6 h-6" />
      </div>
      <div className="flex gap-2">
        Color
        <div>
          <div className="h-6 w-6 bg-primary-900"></div>
          <div className="h-6 w-6 bg-primary-800"></div>
          <div className="h-6 w-6 bg-primary-700"></div>
          <div className="h-6 w-6 bg-primary-600"></div>
          <div className="h-6 w-6 bg-primary-500"></div>
          <div className="h-6 w-6 bg-primary-600"></div>
          <div className="h-6 w-6 bg-primary-300"></div>
          <div className="h-6 w-6 bg-primary-200"></div>
          <div className="h-6 w-6 bg-primary-100"></div>
          <div className="h-6 w-6 bg-primary-50"></div>
        </div>
        <div>
          <div className="h-6 w-6 bg-secondary-900"></div>
          <div className="h-6 w-6 bg-secondary-800"></div>
          <div className="h-6 w-6 bg-secondary-700"></div>
          <div className="h-6 w-6 bg-secondary-600"></div>
          <div className="h-6 w-6 bg-secondary-500"></div>
          <div className="h-6 w-6 bg-secondary-600"></div>
          <div className="h-6 w-6 bg-secondary-300"></div>
          <div className="h-6 w-6 bg-secondary-200"></div>
          <div className="h-6 w-6 bg-secondary-100"></div>
          <div className="h-6 w-6 bg-secondary-50"></div>
        </div>
        <div>
          <div className="h-6 w-6 bg-grayscale-900"></div>
          <div className="h-6 w-6 bg-grayscale-800"></div>
          <div className="h-6 w-6 bg-grayscale-700"></div>
          <div className="h-6 w-6 bg-grayscale-600"></div>
          <div className="h-6 w-6 bg-grayscale-500"></div>
          <div className="h-6 w-6 bg-grayscale-400"></div>
          <div className="h-6 w-6 bg-grayscale-300"></div>
          <div className="h-6 w-6 bg-grayscale-200"></div>
          <div className="h-6 w-6 bg-grayscale-100"></div>
          <div className="h-6 w-6 bg-grayscale-0"></div>
        </div>
        <div>
          <div className="h-6 w-6 bg-background-100"></div>
          <div className="h-6 w-6 bg-warning-100"></div>
          <div className="h-6 w-6 bg-success-100"></div>
        </div>
      </div>
      <div>
        <span className="h1 font-extrabold">Text</span>
        <span className="h1 font-bold">Text</span>
        <span className="h1 font-medium">Text</span>
      </div>
      <div>
        <span className="h2 font-extrabold">Text</span>
        <span className="h2 font-bold">Text</span>
        <span className="h2 font-medium">Text</span>
      </div>
      <div>
        <span className="h3 font-extrabold">Text</span>
        <span className="h3 font-bold">Text</span>
        <span className="h3 font-medium">Text</span>
      </div>
      <div>
        <span className="h4 font-extrabold">Text</span>
        <span className="h4 font-bold">Text</span>
        <span className="h4 font-medium">Text</span>
      </div>
      <div>
        <span className="b1 font-bold">Body</span>
        <span className="b1 font-medium">Body</span>
        <span className="b1 font-normal">Body</span>
      </div>
      <div>
        <span className="b2 font-bold">Body</span>
        <span className="b2 font-medium">Body</span>
        <span className="b2 font-normal">Body</span>
      </div>
      <div>
        <span className="b3 font-bold">Body</span>
        <span className="b3 font-medium">Body</span>
        <span className="b3 font-normal">Body</span>
      </div>
      <div>
        <span className="b4 font-bold">Body</span>
        <span className="b4 font-medium">Body</span>
        <span className="b4 font-normal">Body</span>
      </div>
      <div>
        <span className="b5 font-bold">Body</span>
        <span className="b5 font-medium">Body</span>
        <span className="b5 font-normal">Body</span>
      </div>
      <div>
        <span className="caption font-medium">Caption</span>
        <span className="caption font-normal">Caption</span>
      </div>
    </>
  );
}
