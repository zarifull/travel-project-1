import React from "react";
import balloon from '../../Assets/balloon.png';
import ship from '../../Assets/ship.png';
import { useTranslation } from 'react-i18next';

const Advantages = () => {
  const { t } = useTranslation();

  return (
    <>
      <p className='adv-theme'>{t("advantages.title")}</p>
      <div className="adv-block">

        <div className="adv-box1 adv-boxes">
          <svg className='adv-img1 advimges' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="64px" height="64px">
            <path d="M407.7832 72.003906A8 8 0 0 0 405.73047 72.330078L54.839844 176L16 176A8 8 0 0 0 8 184L8 440A8 8 0 0 0 16 448L496 448A8 8 0 0 0 504 440L504 184A8 8 0 0 0 496 176L445.91016 176L415.65039 77.650391A8 8 0 0 0 407.7832 72.003906z M402.67969 89.910156L429.16992 176L111.31055 176L402.67969 89.910156z M24 192L384 192L384 208A8 8 0 0 0 400 208L400 192L456 192L456 432L400 432L400 424A8 8 0 0 0 384 424L384 432L24 432L24 192z M472 192L488 192L488 432L472 432L472 192z"/>
          </svg>
          <p>{t("advantages.ticket")}</p>
          <span className='adv-article'>{t("advantages.tailored")}.</span>
        </div>

        <div className="adv-box2 adv-boxes">
          <img src={balloon} alt="activities-2"  className='adv-img2 advimges' />
          <p>{t("advantages.activities")}</p>
          <span className='adv-article'>{t("advantages.local_experts")}.</span>
        </div>

        <div className="adv-box3 adv-boxes">
          <img src={ship} alt=""  className='adv-img3 advimges'  />
          <p>{t("advantages.travel")}</p>
          <span className='adv-article'>{t("advantages.support_safety")}</span>
        </div>

        <div className="adv-box4 adv-boxes">
          <svg  className='adv-img4 advimges'  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100" width="100px" height="100px">
            <path d="M32.582031 29C30.628031 29 28.820281 30.057812 27.863281 31.757812L12.130859 59.507812C12.117859 59.529812 12.118422 59.553172 12.107422 59.576172C11.427422 60.365172 11 61.379 11 62.5C11 64.981 13.019 67 15.5 67L16.302734 67C17.696734 73.839 23.756 79 31 79C39.271 79 46 72.271 46 64C46 63.662 45.971219 63.332 45.949219 63L46 63C46 60.794 47.794 59 50 59C52.206 59 54 60.794 54 63L54.050781 63C54.028781 63.332 54 63.662 54 64C54 72.271 60.729 79 69 79C76.244 79 82.303266 73.839 83.697266 67L84.5 67C86.981 67 89 64.981 89 62.5C89 61.379 88.572578 60.365172 87.892578 59.576172C87.881578 59.553172 87.882141 59.529812 87.869141 59.507812L72.138672 31.761719C71.180672 30.058719 69.371969 29 67.417969 29C64.430969 29 62 31.430969 62 34.417969L62 36C62 36.553 62.448 37 63 37C63.552 37 64 36.553 64 36L64 34.417969C64 32.533969 65.533969 31 67.417969 31C68.649969 31 69.791484 31.667141 70.396484 32.744141L84.728516 58.023438C84.651516 58.019438 84.579 58 84.5 58L83 58C82.916 58 82.839719 58.028828 82.761719 58.048828C80.452719 52.731828 75.156 49 69 49C63.579 49 58.834219 51.901656 56.199219 56.222656C55.027219 54.309656 52.69 53 50 53C47.31 53 44.972781 54.309656 43.800781 56.222656C41.165781 51.901656 36.421 49 31 49C24.844 49 19.547281 52.731828 17.238281 58.048828C17.160281 58.028828 17.084 58 17 58L15.5 58C15.421 58 15.348484 58.019437 15.271484 58.023438L29.605469 32.740234C30.209469 31.666234 31.350031 31 32.582031 31C34.466031 31 36 32.533969 36 34.417969L36 36C36 36.553 36.448 37 37 37C37.552 37 38 36.553 38 36L38 34.417969C38 31.430969 35.569031 29 32.582031 29z"/>
          </svg>
          <p>{t("advantages.sightseeing")}</p>
          <span className='adv-article'>{t("advantages.hidden_gems")}.</span>
        </div>

      </div>
    </>
  );
};

export default Advantages;
