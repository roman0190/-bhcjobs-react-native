# BhcJobs

BhcJobs is a React Native job listing app focused on a clean landing page, reusable cards, animated UI, and API-driven sections.

## Project Overview

This project includes:

- Theme-aware light/dark UI
- Animated hero section with wave background
- Reusable job card components
- loading states
- Horizontal trending and hot job sections
- Authentication flow screens
- API integration for jobs, companies, industries, and authentication

## Tech Stack

- React Native 0.85.3
- React 19
- TypeScript
- React Navigation
- React Native Reanimated
- React Native SVG
- React Native Vector Icons
- Axios
- AsyncStorage

## Screens / Pages

### Landing Screen

The landing page currently composes these sections:

- Hero
- IndustrySection
- TrendingJobsSection
- RecommendedSection
- PopularCompaniesSection
- HotJobsSection

### Authentication Screens

- LoginScreen
- SignupScreen
- OtpScreen

## Reusable Components

### Landing Components

- Hero - banner section with search UI
- Wave - animated SVG wave background
- TrendingJobCard - compact card for trending jobs
- TrendingJobsSection - horizontal trending jobs list
- RecommendedJobCard - detailed reusable job card
- HotJobsSection - horizontally scrolling hot jobs list
- IndustrySection - industry showcase block
- PopularCompaniesSection - company showcase block
- RecommendedSection - extra recommendation block on landing

### Common / Layout Components

- Loading - reusable spinner
- AppLayout - shared page wrapper
- Header - top application header

## API Integration

### Job API

- `GET /api/job/get`

Used by:

- TrendingJobsSection
- RecommendedJobsSection
- HotJobsSection

UI filtering rules:

- Trending jobs: `is_trending === 1`
- Hot jobs: `is_hot === 1`
- Expired jobs are filtered out using `expiry`

### Recommended Card Reuse

- `RecommendedJobCard` is reused inside the hot jobs section for a consistent card design.

### Company API

- `GET /api/company/get`

### Industry API

- `GET /api/industry/get`

### Authentication APIs

- `POST /api/job_seeker/register`
- `POST /api/job_seeker/phone_verify`
- `POST /api/job_seeker/login`

## Important Data Handling

- Company image URLs are built from the API `company.image` value.
- Salary is displayed with BDT conversion where needed.
- Food allowance is shown only when `food_option === 'allowance'`.
- Date formatting is handled inside the card components.
- Auth token state is stored with AsyncStorage.

## Folder Structure

```text
src/
	api/
	components/
		common/
		landing/
		layout/
	navigation/
	screens/
	storage/
	theme/
	utils/
```

## Setup Instructions

### 1. Install dependencies

```sh
npm install
```

### 2. Install iOS pods

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

### 3. Start Metro

```sh
npm start
```

### 4. Run Android

```sh
npm run android
```

### 5. Run iOS

```sh
npm run ios
```

## Build Instructions

### Android Debug Build

```sh
cd android
./gradlew assembleDebug
```

### Android Release APK

```sh
cd android
./gradlew assembleRelease
```

The APK will be generated in the Android build outputs folder.

### iOS Release Build

Open the iOS project in Xcode and archive the app from there.

## Available Scripts

- `npm start` - start Metro bundler
- `npm run android` - run Android app
- `npm run ios` - run iOS app
- `npm run lint` - run ESLint
- `npm test` - run Jest tests

## Features Implemented

- Theme system with `ThemeContext`
- Animated hero and wave section
- Landing page composition with multiple reusable sections
- Trending jobs filtering with `is_trending`
- Hot jobs filtering with `is_hot`
- Horizontal auto-scroll for hot jobs
- Reusable recommendation-style job card
- Skeleton loaders for better loading states
- Navigation stack for main app flow
- Safe API fallbacks that return empty arrays on failure

## Current Screens Available

- Landing
- Sign in
- Sign up
- OTP

## Notes

- The landing page is the primary demo page and satisfies the requirement for at least one working page.
- This project is organized for UI-focused submission with reusable components and API-driven sections.

## Troubleshooting

If the app does not run correctly:

1. Reinstall dependencies with `npm install`
2. Reinstall iOS pods with `bundle exec pod install`
3. Reset Metro with `npm start -- --reset-cache`
4. Clean and rebuild the native project

## License

This project is intended for assessment and demo use.
