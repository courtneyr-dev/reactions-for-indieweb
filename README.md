# Reactions for IndieWeb

[![WordPress](https://img.shields.io/badge/WordPress-6.5%2B-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-8.0%2B-purple.svg)](https://php.net/)
[![License](https://img.shields.io/badge/License-GPL--2.0--or--later-green.svg)](LICENSE)
[![IndieWeb](https://img.shields.io/badge/IndieWeb-compatible-orange.svg)](https://indieweb.org/)

A comprehensive WordPress plugin that extends IndieBlocks with rich support for IndieWeb Post Kinds, external API integrations, and media tracking. Share what you're listening to, watching, reading, and experiencing—all on your own website.

## Features

### Post Kinds Support
- **Listen** - Track music you've listened to with MusicBrainz/ListenBrainz/Last.fm integration
- **Watch** - Log movies and TV shows with TMDB/Trakt/Simkl support
- **Read** - Track books with Open Library/Hardcover/Google Books integration
- **Checkin** - Location check-ins with Foursquare/Nominatim geocoding
- **Like, Reply, Repost, Bookmark, RSVP** - Full IndieWeb interaction support

### External API Integrations
- **Music**: MusicBrainz, ListenBrainz, Last.fm
- **Movies/TV**: TMDB, Trakt, Simkl, TVmaze
- **Books**: Open Library, Hardcover, Google Books
- **Podcasts**: Podcast Index
- **Location**: Foursquare, Nominatim (OpenStreetMap)

### Import & Sync
- Bulk import from ListenBrainz, Last.fm, Trakt, Simkl, Hardcover
- Webhook support for Plex, Jellyfin, Trakt, ListenBrainz
- Background processing with WP-Cron

### Block Editor Integration
- Custom blocks for each post kind
- Media search/lookup in editor
- Star rating component
- Microformats2 output for IndieWeb compatibility

## Requirements

- WordPress 6.5+
- PHP 8.0+
- [IndieBlocks](https://developer.wordpress.org/plugins/indieblocks/) plugin (recommended)

## Installation

1. Download or clone this repository to your `wp-content/plugins/` directory
2. Run `composer install` to install PHP dependencies
3. Run `npm install && npm run build` to build JavaScript assets
4. Activate the plugin in WordPress admin

## Configuration

1. Navigate to **Reactions** in the WordPress admin menu
2. Configure API connections under **API Connections**
3. Set up webhooks under **Webhooks** for automatic scrobbling
4. Use **Quick Post** for rapid content creation

## Development

```bash
# Install dependencies
npm install
composer install

# Build for development
npm run start

# Build for production
npm run build

# Lint code
npm run lint
composer run phpcs
```

## Block Patterns

The plugin includes several block patterns:
- Listen Log
- Watch Log
- Read Progress
- Checkin Card
- RSVP Response

## Hooks & Filters

### Filters

```php
// Modify post kinds
add_filter('reactions_indieweb_post_kinds', function($kinds) {
    // Add custom kind
    $kinds['custom'] = [
        'label' => 'Custom',
        'icon' => 'dashicons-star-filled',
    ];
    return $kinds;
});

// Modify API response caching
add_filter('reactions_indieweb_cache_duration', function($duration, $api) {
    return 3600; // 1 hour
}, 10, 2);
```

### Actions

```php
// After a reaction post is created
add_action('reactions_indieweb_post_created', function($post_id, $kind, $data) {
    // Custom logic
}, 10, 3);

// After import completes
add_action('reactions_indieweb_import_complete', function($import_id, $stats) {
    // Send notification, etc.
}, 10, 2);
```

## Microformats

All output includes proper microformats2 markup for IndieWeb compatibility:

- `h-entry` for posts
- `h-cite` for citations
- `h-card` for people/artists
- `h-adr` for locations
- `h-event` for events (RSVP)

## Custom Blocks

The plugin includes 7 custom Gutenberg blocks:

| Block | Description |
|-------|-------------|
| **Listen Card** | Music/podcast with album art, artist, rating |
| **Watch Card** | Movie/TV with poster, episode info, rewatch tracking |
| **Read Card** | Book with cover, author, reading progress |
| **Checkin Card** | Location with venue details and map embed |
| **RSVP Card** | Event response (yes/no/maybe/interested/remote) |
| **Star Rating** | Standalone rating component |
| **Media Lookup** | Universal media search and embed |

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

### Quick Start

```bash
git clone https://github.com/courtneyr-dev/reactions-for-indieweb.git
cd reactions-for-indieweb
composer install
npm install
npm run build
```

## Support

- [GitHub Issues](https://github.com/courtneyr-dev/reactions-for-indieweb/issues) - Bug reports and feature requests
- [GitHub Discussions](https://github.com/courtneyr-dev/reactions-for-indieweb/discussions) - Questions and ideas
- [IndieWeb Chat](https://chat.indieweb.org/) - Real-time community help
- [SUPPORT.md](SUPPORT.md) - FAQ and troubleshooting

## Security

Please report security vulnerabilities privately. See [SECURITY.md](SECURITY.md) for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes.

## License

GPL v2 or later. See [LICENSE](LICENSE) for details.

## Credits

- Built to extend [IndieBlocks](https://developer.wordpress.org/plugins/indieblocks/)
- Inspired by [Post Kinds](https://developer.wordpress.org/plugins/indieweb-post-kinds/)
- Uses data from MusicBrainz, TMDB, Open Library, and other open APIs
- Made with love for the IndieWeb community
