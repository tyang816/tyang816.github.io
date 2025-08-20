source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

gem "jekyll", "~> 4.3"

# If you want to use Jekyll native, uncomment the line below.
# To upgrade, run `bundle update`.

# gem "jekyll"

gem "wdm", "~> 0.1.0" if Gem.win_platform?

# If you have any plugins, put them here!
group :jekyll_plugins do
  # gem "jekyll-archives"
  gem "jekyll-feed", "~> 0.17"
  gem 'jekyll-sitemap', "~> 1.4"
  gem 'jekyll-redirect-from', "~> 0.16"
  gem 'jekyll-paginate', "~> 1.1"
  gem 'jekyll-gist', "~> 1.5"
  gem 'jemoji', "~> 0.13"
end

# Ruby 3.x no longer bundles webrick
gem "webrick", "~> 1.8"

# Ensure Nokogiri supports Ruby 3.3+
gem "nokogiri", ">= 1.16"
