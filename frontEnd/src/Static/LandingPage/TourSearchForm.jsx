import React from "react";
import { useTranslation } from "react-i18next";

function TourSearchForm({ destination, setDestination, date, setDate, guests, setGuests, handleBooking, loading }) {
  const { t } = useTranslation();

  return (
    <section className="booking">
      <div className="booking-theme">{t("booking.booking")}</div>
      <div className="booking-block">
        <div className="booking-box">
          <div className="selects select1">
            <i className="fa-solid booking-icons select-icon1 fa-earth-americas"></i>
            <label htmlFor='destination' className='label'>{t("booking.destination")}</label>
            <input
              type='text'
              aria-label={t("booking.destination")}
              placeholder={t("booking.destination_placeholder")}
              className="bValue booking-inp"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="selects select2">
            <i className="fa-solid booking-icons select-icon2 fa-calendar-days"></i>
            <label htmlFor='date' className="label">{t("booking.date")}</label>
            <input
              type='date'
              className="bValue booking-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="selects select3">
            <i className="fa-solid booking-icons fa-suitcase-rolling"></i>
            <label htmlFor='guests' className="label">{t("booking.guests")}</label>
            <input
              type='number'
              min="1"
              placeholder={t("booking.guests_placeholder")}
              className="bValue booking-guests"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
            />
          </div>

          <div className="booking-search">
            <button type="button" className='booking-btn' onClick={handleBooking}>
              <i className="fa-solid booking-icon fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#5c7cfa' }}>{t("booking.searching")}</p>}
    </section>
  );
}

export default TourSearchForm;
