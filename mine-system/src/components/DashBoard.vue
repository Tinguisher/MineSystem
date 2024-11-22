<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <div class="flex-row right" style="height: 5%">
        <p class="username">Username</p>
        <div class="image-profile"></div>
      </div>
      <div class="flex-row" style="height: 10%"><h1>Dashboard</h1></div>
      <div class="flex-row space-between">
        <div
          class="flex-column space-between"
          style="width: 49.3%; height: 100%"
        >
          <div style="height: 48.5%">
            <div
              class="container flex-column space-between"
              style="width: 94.15%; height: 89.7%"
            >
              <div class="container-title">Total Sales</div>
              <div class="container-content flex-column" style="height: 90%">
                <div class="total-sales">PHP 000,000,000</div>
                <div style="height: 15%; margin-bottom: 10px">
                  <div class="buttons">
                    <button
                      v-for="tab in tabs"
                      :key="tab"
                      :class="{ active: selectedTab === tab }"
                      @click="changeTab(tab)"
                    >
                      {{ tab }}
                    </button>
                  </div>
                </div>
                <div style="height: 85%">
                  <div class="chart">
                    <canvas ref="chartCanvas"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="height: 48.5%">
            <div class="flex-column space-between">
              <div
                class="container-title"
                style="height: 11%; border-bottom: 1px solid #e1e1e1"
              >
                This Month
              </div>
              <div
                class="container-content flex-row"
                style="height: 85%; justify-content: space-between"
              >
                <div class="flex-column space-between" style="width: 64%">
                  <div class="flex-row space-between" style="height: 38%">
                    <div style="width: 43.5%">
                      <div class="create-live">
                        <PhBroadcast :size="50" color="#ffffff" />
                        <p>CREATE<br />LIVE SESSION</p>
                      </div>
                    </div>

                    <div style="width: 53.5%">
                      <div class="summary">
                        <div class="flex-row center" style="height: 40%">
                          <div class="number-summary">
                            000
                            <img src="../assets/arrow-summary.png" />
                          </div>
                          <div class="title-summary">Live<br />Sessions</div>
                        </div>
                        <div style="height: 15%; font-size: 11px">
                          000 from the last month
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="container" style="width: 92%; height: 46%">
                    <div class="container-title">
                      <div class="icon-container">
                        <PhBroadcast :size="35" color="#ffbb00" />
                      </div>
                      Live Sessions
                    </div>
                    <div
                      class="container-content flex-column"
                      style="justify-content: flex-start"
                    >
                      <div
                        class="top-list flex-row space-between"
                        style="height: 35%; margin-top: 1%"
                      >
                        <p style="width: 25%; font-weight: 500">DD/MM/YYYY</p>
                        <p style="width: 50%; font-weight: 800">
                          SAMPLE EVENT TITLE
                        </p>
                        <button class="view-button">View</button>
                      </div>
                    </div>
                    <div class="view">View Details</div>
                  </div>
                </div>
                <div class="flex-column space-between" style="width: 34%">
                  <div style="height: 38%">
                    <div class="summary">
                      <div class="flex-row center" style="height: 40%">
                        <div class="number-summary">
                          000000
                          <img src="../assets/arrow-summary.png" />
                        </div>
                        <div class="title-summary">New<br />Miners</div>
                      </div>
                      <div style="height: 15%; font-size: 11px">
                        00000 from the last month
                      </div>
                    </div>
                  </div>
                  <div style="height: 57%">
                    <div
                      class="container flex-column"
                      style="width: 84.5%; height: 80.5%"
                    >
                      <div class="container-title">
                        <div class="icon-container">
                          <PhUser :size="35" color="#ffbb00" />
                        </div>
                        New Miners
                      </div>
                      <div
                        class="container-content flex-column"
                        style="justify-content: flex-start"
                      >
                        <div class="top-list">Last Name, First Name</div>
                      </div>
                      <div class="view">View Details</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row space-between" style="width: 49.3%; height: 100%">
          <div class="flex-column space-between" style="width: 48.5%">
            <div class="flex-column" style="height: 33.5%">
              <div
                class="flex-column container space-between"
                style="height: 100%; width: 88.05%"
              >
                <div class="container-title">
                  <div class="icon-container">
                    <PhClipboardText :size="35" color="#ffbb00" />
                  </div>
                  Orders to Ship
                </div>
                <div class="container-content flex-column">
                  <div class="ship-count">
                    000
                    <PhWarningCircle :size="32" weight="fill" />
                  </div>
                  <div class="ship-text">Total Products<br />for Shipment</div>
                </div>
                <div class="view">View Details</div>
              </div>
            </div>
            <div class="flex-column" style="height: 63.5%">
              <div
                class="flex-column container space-between"
                style="height: 100%; width: 88.05%"
              >
                <div class="space-between">
                  <div class="container-title" style="height: 10%">
                    <div class="icon-container">
                      <PhTreasureChest :size="35" color="#ffbb00" />
                    </div>
                    Inventory Summary
                  </div>
                  <div
                    class="container-content flex-column"
                    style="
                      height: 380px;
                      overflow: hidden;
                      justify-content: flex-start;
                    "
                  >
                    <div class="inventory flex-row">
                      <div style="width: 15%">
                        <div class="product-image"></div>
                      </div>
                      <div class="product-info" style="width: 85%">
                        <div class="flex-row space-between inventory-text">
                          <p>Product Name</p>
                          <p>Quantity</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="view">View Details</div>
              </div>
            </div>
          </div>
          <div class="flex-column" style="width: 48.5%">
            <div class="flex-column container" style="width: 88.1%">
              <div class="flex-column space-between">
                <div
                  class="container-title"
                  style="border-bottom: 1px solid #e1e1e1; height: 6%"
                >
                  <div class="icon-container">
                    <PhBell :size="35" color="#ffbb00" />
                  </div>
                  Notifications
                </div>
                <div class="container-content notif" style="height: 685px">
                  <div
                    class="notif"
                    style="
                      overflow-y: scroll;
                      justify-content: flex-start;
                      align-items: flex-start;
                    "
                  >
                    <div class="notification flex-row">
                      <div class="flex-row">
                        <div
                          class="center icon-container"
                          style="justify-content: center; align-items: center"
                        >
                          <PhClipboardText :size="25" />
                        </div>
                        Sample Notification
                      </div>
                      <div
                        class="icon-container center"
                        style="justify-content: center; align-items: center"
                      >
                        <PhX :size="25" weight="bold" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  PhTreasureChest,
  PhWarningCircle,
  PhClipboardText,
  PhBroadcast,
  PhUser,
  PhX,
  PhBell,
} from "@phosphor-icons/vue";
import Chart from "chart.js/auto";

export default {
  name: "DashBoard",
  components: {
    PhTreasureChest,
    PhWarningCircle,
    PhClipboardText,
    PhBroadcast,
    PhUser,
    PhX,
    PhBell,
  },
  data() {
    return {
      view: "View Details",
      tabs: ["Day", "Week", "Month", "Year"],
      selectedTab: "Day",
      chart: null,
      chartData: {
        Day: {
          labels: ["1", "2", "3", "4", "5", "6", "7"],
          data: [10, 20, 15, 30, 25, 40, 35],
        },
        Week: {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          data: [50, 60, 55, 70, 65, 80, 75],
        },
        Month: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          data: [100, 120, 110, 130, 125, 140, 135, 150, 145, 160, 155, 170],
        },
        Year: {
          labels: ["2021", "2022", "2023", "2024", "2025"],
          data: [200, 250, 300, 270, 320],
        },
      },
    };
  },
  methods: {
    changeTab(tab) {
      this.selectedTab = tab;
      this.updateChart();
    },
    updateChart() {
      if (this.chart) {
        this.chart.destroy(); // Destroy previous chart instance
      }
      const ctx = this.$refs.chartCanvas.getContext("2d");
      const { labels, data } = this.chartData[this.selectedTab];

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(241, 177, 0, 0.25)"); // Top color
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Bottom color

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: this.selectedTab,
              data,
              borderColor: "#f1b100",
              backgroundColor: gradient,
              tension: 0,
              fill: true,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#ffbb00", // Fill color for the points
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false, // Hides the legend
            },
            tooltip: {
              enabled: true, // Enable the tooltip
              backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background color
              titleColor: "#ffffff", // Title text color
              bodyColor: "#ffffff", // Body text color
              borderColor: "#f0c14b", // Border color
              borderWidth: 1, // Border width
              callbacks: {
                title: (tooltipItems) => {
                  // Custom title for the tooltip
                  return `Date: ${tooltipItems[0].label}`;
                },
                label: (tooltipItem) => {
                  // Custom label for the tooltip (only display value)
                  return `Value: ${tooltipItem.raw}`;
                },
              },
            },
          },
          scales: {
            x: { grid: { display: false } },
            y: { ticks: { display: false }, beginAtZero: true },
          },
        },
      });
    },
  },
  mounted() {
    this.updateChart();
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  width: 98%;
  height: 100%;
  float: right;
}

h1 {
  font-size: 64px;
  font-weight: bold;
}

.container {
  border-radius: 10px;
  border: 3px solid rgba(251, 255, 244, 0.27);
  background: #fdfdfd;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 20px 20px 10px 20px;
}

.container-title {
  display: flex;
  align-items: left;
  height: auto;
  font-size: 27px;
  font-weight: 500;
}

.container-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
}

.total-sales {
  height: auto;
  font-size: 48px;
  font-weight: 500;
  text-align: left;
  color: #ffbb00;
}

canvas {
  max-height: 99%;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  border-radius: 10px;
  padding: 3px 8px;
  border: 1px solid #f1b100;
  width: 35%;
  height: 85%;
}

button {
  border: none;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  padding: 5px 15px;
  font-size: 11px;
  font-weight: 900;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #f1b100;
}

button.active {
  background-color: #f1b100;
  color: white;
}

.create-live {
  width: 100%;
  height: 100%;
  background: #f1b100;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.create-live p {
  text-align: left;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  margin-left: 3%;
}

.summary {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-color: rgba(251, 255, 244, 0.27);
  background: #fdfdfd;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
}

.number-summary {
  display: flex;
  justify-content: right;
  align-items: center;
  height: auto;
  font-size: 37px;
  font-weight: 500;
  width: auto;
  height: auto;
}

.title-summary {
  display: flex;
  text-align: left;
  align-items: center;
  height: auto;
  font-size: 20px;
  line-height: 85%;
  font-weight: 500;
  margin-left: 3%;
  width: auto;
  height: auto;
}

.top-list {
  display: flex;
  align-items: center;
  text-align: left;
  height: 25%;
  margin-top: 2.5%;
  border-bottom: 1px solid #e1e1e1;
}

.view-button {
  height: 70%;
  width: 15%;
  border: none;
  border-radius: 10px;
  background: #f1b100;
  color: #ffffff;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
}

.ship-text {
  font-size: 20px;
  font-weight: 700;
  height: auto;
  width: auto;
}

.ship-count {
  font-size: 64px;
  font-weight: 700;
  width: auto;
  height: 45%;
  display: flex;
  justify-content: center;
}

.product-quantity {
  width: 100%;
  height: 100%;
}

.product-quantity tbody {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.product-image {
  width: 45px;
  height: 45px;
  background-color: #ffbb00;
  border-radius: 25px;
}

.inventory {
  height: 45px;
  padding-top: 4%;
}

.inventory-text {
  font-size: 20px;
  font-weight: 500;
}

.product-info {
  border-bottom: 1px solid #e1e1e1;
}

.view {
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 15px;
  color: #ffbb00;
  height: 7%;
  font-weight: 500;
  cursor: pointer;
}

.notification {
  height: 40px;
  width: 98%;
  border-radius: 8px;
  background: #b1b1b1;
  margin-bottom: 3%;
}

.notif::-webkit-scrollbar {
  width: 10px;
}

.notif::-webkit-scrollbar-track {
  background: #e1e1e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #f1b100;
  border-radius: 10px;
}

.icon-container {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  width: 45px;
}
</style>
