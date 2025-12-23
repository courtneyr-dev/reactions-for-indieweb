=== Reactions for IndieWeb ===
Contributors: courtneyr-dev
Tags: indieweb, reactions, scrobbling, microformats, post-kinds
Requires at least: 6.5
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Extend IndieBlocks with additional post kinds, media reactions, and external API integrations for the IndieWeb.

== Description ==

Reactions for IndieWeb extends the IndieBlocks plugin with additional "post kinds" for sharing your media consumption and experiences. Track what you're listening to, watching, reading, and where you've been—all on your own website.

= Features =

**Post Kinds**
* Listen - Share music, podcasts, and audio you're enjoying
* Watch - Log movies, TV shows, and videos
* Read - Track books with reading progress
* Checkin - Share locations you've visited
* RSVP - Respond to events

**Custom Blocks**
* Listen Card - Beautiful music display with album art
* Watch Card - Movie posters with episode tracking
* Read Card - Book covers with progress bar
* Checkin Card - Location with embedded map
* RSVP Card - Event response display
* Star Rating - Standalone rating component
* Media Lookup - Search and embed media info

**External Integrations**
* Music: MusicBrainz, Last.fm, ListenBrainz
* Movies/TV: TMDB, Trakt, TVMaze, Simkl
* Books: Open Library, Google Books, Hardcover
* Podcasts: Podcast Index
* Locations: Foursquare, OpenStreetMap

**IndieWeb Features**
* Full microformats2 markup (h-entry, h-cite, h-card, etc.)
* Compatible with Webmention plugins
* Supports POSSE workflows
* Works with IndieBlocks blocks

= Requirements =

* WordPress 6.5 or higher
* PHP 8.0 or higher
* IndieBlocks plugin (recommended but not required)

= Getting Started =

1. Install and activate the plugin
2. Optionally install IndieBlocks for additional blocks
3. Configure API keys in Settings → Reactions for IndieWeb
4. Start creating posts with reaction blocks!

= Documentation =

* [GitHub Repository](https://github.com/courtneyr-dev/reactions-for-indieweb)
* [IndieWeb Wiki](https://indieweb.org/)
* [IndieBlocks](https://wordpress.org/plugins/indieblocks/)

== Installation ==

= Automatic Installation =

1. Go to Plugins → Add New in your WordPress admin
2. Search for "Reactions for IndieWeb"
3. Click Install Now, then Activate

= Manual Installation =

1. Download the plugin from WordPress.org
2. Upload to `/wp-content/plugins/reactions-for-indieweb/`
3. Activate through the Plugins menu

= From GitHub =

1. Download the latest release from GitHub
2. Upload to your plugins directory
3. Run `composer install` and `npm run build`
4. Activate the plugin

== Frequently Asked Questions ==

= Do I need IndieBlocks installed? =

No, but it's recommended. IndieBlocks provides core blocks for bookmarks, likes, replies, and reposts. Reactions for IndieWeb adds complementary post kinds (listen, watch, read, etc.).

= How do I get API keys? =

Go to Settings → Reactions for IndieWeb → API Settings. Each service has a link to get your API key. Some services (MusicBrainz, Open Library) don't require keys.

= Can I import my existing data? =

Yes! Go to Tools → Reactions Import to import from Last.fm, Trakt, Goodreads exports, and more.

= Does this work with the Classic Editor? =

The custom blocks require the block editor. Basic post kind functionality works with Classic Editor but with limited UI.

= How do I customize the block appearance? =

Use the block sidebar settings in the editor, Global Styles in the Site Editor, or add custom CSS to your theme.

= Is my data private? =

All data is stored on your WordPress site. External API calls only retrieve public metadata; your posts are not shared with external services unless you explicitly syndicate them.

== Screenshots ==

1. Listen Card block displaying a song with album art and rating
2. Watch Card block showing a movie with poster and review
3. Read Card block with book cover and reading progress
4. Checkin Card with location and embedded map
5. Settings page with API configuration
6. Block inserter showing reaction blocks

== Changelog ==

= 1.0.0 =
* Initial release
* Added Listen, Watch, Read, Checkin, and RSVP post kinds
* Added 7 custom Gutenberg blocks
* Integrated with MusicBrainz, TMDB, Open Library, and more
* Full microformats2 support
* Admin settings and import tools

== Upgrade Notice ==

= 1.0.0 =
Initial release. Welcome to Reactions for IndieWeb!

== Privacy Policy ==

This plugin:
* Stores all post data locally in your WordPress database
* Makes API calls to external services only when you search for media
* Does not track users or send analytics
* API keys are stored securely in WordPress options

External services used (when configured):
* MusicBrainz/ListenBrainz - Music metadata
* Last.fm - Music metadata and scrobbling
* TMDB - Movie and TV metadata
* Trakt/Simkl/TVMaze - Movie and TV tracking
* Open Library/Google Books - Book metadata
* Podcast Index - Podcast metadata
* Foursquare - Venue information
* OpenStreetMap - Map embeds

Each external service has its own privacy policy. API calls only retrieve public metadata.
