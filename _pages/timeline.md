---
permalink: /timeline/
title: "Life Timeline"
layout: default
author_profile: true
---

<span class='anchor' id='timeline'></span>

# 🌍 Life Timeline

<div class="timeline-filters">
  <button class="filter-btn active" data-category="all">All</button>
  <button class="filter-btn" data-category="travel">Travel World</button>
  <button class="filter-btn" data-category="person">Camera Moment</button>
</div>

<div class="timeline-container">
  <div class="timeline">
    {% assign sorted_items = site.data.timeline.timeline_items | sort: 'date' | reverse %}
    {% for item in sorted_items %}
      {% assign date_parts = item.date | split: '-' %}
      <div class="timeline-item" data-category="{{ item.category }}">
        <div class="timeline-date-left">
          {% assign year = date_parts[0] %}
          {% assign month = date_parts[1] %}
          {% assign day = date_parts[2] %}
          {% case month %}
            {% when '01' %}{% assign month_name = 'January' %}
            {% when '02' %}{% assign month_name = 'February' %}
            {% when '03' %}{% assign month_name = 'March' %}
            {% when '04' %}{% assign month_name = 'April' %}
            {% when '05' %}{% assign month_name = 'May' %}
            {% when '06' %}{% assign month_name = 'June' %}
            {% when '07' %}{% assign month_name = 'July' %}
            {% when '08' %}{% assign month_name = 'August' %}
            {% when '09' %}{% assign month_name = 'September' %}
            {% when '10' %}{% assign month_name = 'October' %}
            {% when '11' %}{% assign month_name = 'November' %}
            {% when '12' %}{% assign month_name = 'December' %}
          {% endcase %}
          <div class="date-day">{{ day }}</div>
          <div class="date-month">{{ month_name }}</div>
          <div class="date-year">{{ year }}</div>
        </div>
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="timeline-title">{{ item.title }}</div>
          <div class="timeline-location">
            <i class="fas fa-map-marker-alt"></i> {{ item.location }}
          </div>
          <div class="timeline-description">
            {{ item.description }}
          </div>
          <div class="timeline-gallery" data-item-id="{{ forloop.index }}">
            <div class="gallery-container">
              <div class="gallery-images">
                <img src="{{ item.image }}" alt="{{ item.title }}" class="gallery-image active" onerror="this.style.display='none'">
                {% if item.image2 %}
                  <img src="{{ item.image2 }}" alt="{{ item.title }} 2" class="gallery-image" onerror="this.style.display='none'">
                {% endif %}
                {% if item.image3 %}
                  <img src="{{ item.image3 }}" alt="{{ item.title }} 3" class="gallery-image" onerror="this.style.display='none'">
                {% endif %}
                {% if item.image4 %}
                  <img src="{{ item.image4 }}" alt="{{ item.title }} 4" class="gallery-image" onerror="this.style.display='none'">
                {% endif %}
                {% if item.image5 %}
                  <img src="{{ item.image5 }}" alt="{{ item.title }} 5" class="gallery-image" onerror="this.style.display='none'">
                {% endif %}
                {% if item.image6 %}
                  <img src="{{ item.image6 }}" alt="{{ item.title }} 6" class="gallery-image" onerror="this.style.display='none'">
                {% endif %}
                {% if item.image7 %}
                  <img src="{{ item.image7 }}" alt="{{ item.title }} 7" class="gallery-image" onerror="this.style.display='none'">
                {% endif %}
                {% if item.image8 %}
                  <img src="{{ item.image8 }}" alt="{{ item.title }} 8" class="gallery-image" onerror="this.style.display='none'">
                {% endif %}
                {% if item.image9 %}
                  <img src="{{ item.image9 }}" alt="{{ item.title }} 8" class="gallery-image" onerror="this.style.display='none'">
                {% endif %}
                {% if item.image10 %}
                  <img src="{{ item.image10 }}" alt="{{ item.title }} 10" class="gallery-image" onerror="this.style.display='none'">
                {% endif %}
              </div>
              <button class="gallery-nav gallery-prev" onclick="changeImage({{ forloop.index }}, -1)">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button class="gallery-nav gallery-next" onclick="changeImage({{ forloop.index }}, 1)">
                <i class="fas fa-chevron-right"></i>
              </button>
              <div class="gallery-dots">
                <span class="dot active" onclick="goToImage({{ forloop.index }}, 0)"></span>
                {% if item.image2 %}
                  <span class="dot" onclick="goToImage({{ forloop.index }}, 1)"></span>
                {% endif %}
                {% if item.image3 %}
                  <span class="dot" onclick="goToImage({{ forloop.index }}, 2)"></span>
                {% endif %}
                {% if item.image4 %}
                  <span class="dot" onclick="goToImage({{ forloop.index }}, 3)"></span>
                {% endif %}
                {% if item.image5 %}
                  <span class="dot" onclick="goToImage({{ forloop.index }}, 4)"></span>
                {% endif %}
                {% if item.image6 %}
                  <span class="dot" onclick="goToImage({{ forloop.index }}, 5)"></span>
                {% endif %}
                {% if item.image7 %}
                  <span class="dot" onclick="goToImage({{ forloop.index }}, 6)"></span>
                {% endif %}
                {% if item.image8 %}
                  <span class="dot" onclick="goToImage({{ forloop.index }}, 7)"></span>
                {% endif %}
                {% if item.image9 %}
                  <span class="dot" onclick="goToImage({{ forloop.index }}, 8)"></span>
                {% endif %}
                {% if item.image10 %}
                  <span class="dot" onclick="goToImage({{ forloop.index }}, 9)"></span>
                {% endif %}
              </div>
            </div>
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
</div>

<style>
.timeline-filters {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
}

.filter-btn {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  color: #495057;
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.filter-btn:hover {
  background: #007acc;
  border-color: #007acc;
  color: white;
}

.filter-btn.active {
  background: #007acc;
  border-color: #007acc;
  color: white;
}

.timeline-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 170px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #007acc, #00d4aa);
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
  display: flex;
  align-items: flex-start;
}

.timeline-date-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  text-align: right;
  padding-right: 20px;
  z-index: 3;
}

.date-day {
  font-size: 2.2em;
  font-weight: bold;
  color: #007acc;
  line-height: 1;
  margin-bottom: 3px;
}

.date-month {
  font-size: 1em;
  color: #666;
  font-weight: 500;
  margin-bottom: 2px;
}

.date-year {
  font-size: 1.2em;
  color: #333;
  font-weight: 600;
}

.timeline-marker {
  position: absolute;
  left: 170px;
  top: 30px;
  width: 20px;
  height: 20px;
  background: #007acc;
  border: 4px solid #fff;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 4px rgba(0, 122, 204, 0.2);
  z-index: 2;
}

.timeline-content {
  width: calc(100% - 210px);
  margin-left: 210px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 700px;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}



.timeline-title {
  font-size: 1.1em;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.timeline-location {
  font-size: 0.9em;
  color: #007acc;
  margin-bottom: 10px;
  font-weight: 500;
}

.timeline-location i {
  margin-right: 5px;
}

.timeline-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.timeline-image {
  margin-top: 15px;
}

.timeline-gallery {
  margin-top: 15px;
}

.gallery-container {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.gallery-images {
  position: relative;
  width: 100%;
  height: 100%;
}

.gallery-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-image.active {
  opacity: 1;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  z-index: 10;
}

.gallery-nav:hover {
  background: rgba(0, 0, 0, 0.7);
}

.gallery-prev {
  left: 10px;
}

.gallery-next {
  right: 10px;
}

.gallery-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s ease;
}

.dot.active {
  background: white;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.8);
}

/* Responsive design */
@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
  }
  
  .timeline-date-left {
    position: relative;
    width: 100%;
    text-align: left;
    padding-right: 0;
    margin-bottom: 15px;
  }
  
  .date-day {
    font-size: 1.8em;
    display: inline-block;
    margin-right: 8px;
  }
  
  .date-month {
    font-size: 0.9em;
    display: inline-block;
    margin-right: 8px;
  }
  
  .date-year {
    font-size: 1.1em;
    display: inline-block;
  }
  
  .timeline-marker {
    left: 30px;
  }
  
  .timeline-content {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  
  .gallery-container {
    height: 250px;
  }
  
  .gallery-nav {
    width: 35px;
    height: 35px;
  }
}

/* Animation for timeline items */
.timeline-item {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.5s; }
.timeline-item:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>

<script>
// Gallery state management
const galleryStates = {};

// Initialize gallery states
document.addEventListener('DOMContentLoaded', function() {
  const galleries = document.querySelectorAll('.timeline-gallery');
  galleries.forEach(gallery => {
    const itemId = gallery.getAttribute('data-item-id');
    const images = gallery.querySelectorAll('.gallery-image');
    galleryStates[itemId] = {
      currentIndex: 0,
      totalImages: images.length
    };
  });
});

// Change image function
function changeImage(itemId, direction) {
  const state = galleryStates[itemId];
  if (!state) return;
  
  const newIndex = state.currentIndex + direction;
  if (newIndex >= 0 && newIndex < state.totalImages) {
    goToImage(itemId, newIndex);
  }
}

// Go to specific image
function goToImage(itemId, index) {
  const gallery = document.querySelector(`[data-item-id="${itemId}"]`);
  if (!gallery) return;
  
  const images = gallery.querySelectorAll('.gallery-image');
  const dots = gallery.querySelectorAll('.dot');
  
  // Hide all images
  images.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Show target image and dot
  if (images[index]) {
    images[index].classList.add('active');
  }
  if (dots[index]) {
    dots[index].classList.add('active');
  }
  
  // Update state
  galleryStates[itemId].currentIndex = index;
}

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter timeline items
      timelineItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'flex';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });

  // Intersection observer for smooth animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all timeline items
  timelineItems.forEach(item => {
    observer.observe(item);
  });
});
</script>
