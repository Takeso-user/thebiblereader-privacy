# Privacy Policy — TheBibleReader

**Effective Date:** October 27, 2026  
**Application:** TheBibleReader (`pl.sergiuszmalcew`)  
**Developer:** Sergiusz Malcew

---

## English Version

### 1. Information We Collect and Why
**TheBibleReader** is a free, non-commercial Bible reading and audio study application. You can use the Application in **Guest Mode** without creating an account, or optionally sign in to synchronize your reading progress across devices.

- **Account Information (Optional):** When you register or sign in using Email/Password or Google Sign-In, we collect your email address, display name (if provided by your Google account), and a unique user identifier (UID) via *Google Firebase Authentication*. This data is used solely to authenticate you and associate your reading progress with your account.
- **App Activity & Reading Progress:** We store your selected Bible reading plan, start date, and completed chapters. In Guest Mode, this data is stored strictly locally on your device. When signed in, your reading progress is synchronized with *Google Cloud Firestore* so you can access it on multiple devices.
- **Locally Stored Content:** Downloaded EPUB Bible editions, cached audio chapters, theme settings, font preferences, and daily reminder schedules are stored locally on your device.

### 2. Device Permissions
- **Internet Access (`INTERNET`):** Used to authenticate your account, synchronize reading progress, and download Bible EPUB files and audio chapters.
- **Notifications (`POST_NOTIFICATIONS`):** Used only if you explicitly enable daily reading reminders in Settings, or to display media playback controls while listening to audio chapters.
- **Foreground Media Playback (`FOREGROUND_SERVICE` / `FOREGROUND_SERVICE_MEDIA_PLAYBACK`):** Used to allow uninterrupted audio chapter playback while your screen is locked or while using other apps.

### 3. Data Sharing and Third-Party Services
We **do not sell, rent, trade, or share** your personal data with any advertisers or marketing third parties. The Application contains **no advertisements** and no third-party analytics trackers.

To provide authentication and cloud synchronization, the Application uses:
- **Google Firebase (Authentication & Cloud Firestore):** [https://firebase.google.com/support/privacy](https://firebase.google.com/support/privacy)
- **Google Play Services:** [https://policies.google.com/privacy](https://policies.google.com/privacy)

### 4. Data Security
All data transmitted between the Application and cloud servers is encrypted in transit using HTTPS/TLS. Cleartext HTTP traffic is disabled.

### 5. Data Retention and Account Deletion
You can delete your account and all associated cloud and local data at any time:
- **In-App Deletion (Immediate):** Open **TheBibleReader** → **Settings** → tap **Delete Account** and confirm. This immediately deletes your reading progress in Cloud Firestore, permanently deletes your Firebase Authentication account, and clears your local session data.
- **Web / Email Request:** If you have uninstalled the app, you may request account deletion at [https://github.com/Takeso-user/thebiblereader-privacy/issues](https://github.com/Takeso-user/thebiblereader-privacy/issues) or by email at [sergiusz.malec@thescripturereader.app](mailto:sergiusz.malec@thescripturereader.app).

---

## Русская версия (Политика конфиденциальности)

### 1. Какие данные мы собираем и зачем
**TheBibleReader** — бесплатное некоммерческое приложение для чтения и прослушивания Библии по плану. Вы можете пользоваться Приложением в **Гостевом режиме** без создания аккаунта, либо войти в учётную запись для синхронизации прогресса чтения между устройствами.

- **Данные аккаунта (необязательно):** При регистрации или входе по Email/паролю или через Google Sign-In мы получаем ваш адрес электронной почты, отображаемое имя и уникальный идентификатор пользователя (UID) через *Google Firebase Authentication* исключительно для авторизации и синхронизации прогресса.
- **Прогресс чтения:** Выбранный план чтения, дата начала и список прочитанных глав в Гостевом режиме хранятся только на устройстве, а при входе в аккаунт синхронизируются с *Google Cloud Firestore*.
- **Локальные данные:** Загруженные файлы EPUB, кэш аудиоглав, настройки темы, шрифта и напоминаний хранятся локально на вашем устройстве.

### 2. Передача данных третьим лицам
Мы **не продаём и не передаём** ваши персональные данные рекламным сетям или сторонним маркетологам. В Приложении **нет рекламы**. Используются только инфраструктурные сервисы Google Firebase и Google Play Services для авторизации и облачного хранения прогресса.

### 3. Безопасность и удаление аккаунта
Все данные передаются по защищённому протоколу HTTPS/TLS. Вы можете в любой момент удалить свой аккаунт и все данные:
- **Внутри Приложения:** Откройте **TheBibleReader** → **Настройки** → нажмите **«Удалить аккаунт»** и подтвердите действие. Все облачные данные в Firestore и аккаунт Firebase Auth будут немедленно удалены.
- **Через веб-запрос или Email:** Отправьте запрос на странице [https://github.com/Takeso-user/thebiblereader-privacy/issues](https://github.com/Takeso-user/thebiblereader-privacy/issues) или по адресу [sergiusz.malec@thescripturereader.app](mailto:sergiusz.malec@thescripturereader.app).

