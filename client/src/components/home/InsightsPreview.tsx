import {
  FADE_UP_DESCRIPTION,
  GRAPH_BOX,
  GRAPH_CONTAINER,
  UPWARD_WAVE_SCALE_HEADING_ANIMATION,
} from '@/utils/framer/properties';
import { motion } from 'framer-motion';
const InsightsPreview = () => {
  return (
    <section
      id="insightspreview_section"
      className="bg-[#f9f9ff] px-4 py-10 sm:py-10 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={UPWARD_WAVE_SCALE_HEADING_ANIMATION}
          initial="hidden"
          whileInView="visible"
          className="my-2 text-center text-3xl font-bold"
        >
          Expense Analytics & Insights
        </motion.div>
        <motion.p
          variants={FADE_UP_DESCRIPTION}
          initial="hidden"
          whileInView="visible"
          className="mx-auto mb-12 max-w-2xl text-center text-gray-600"
        >
          Understand your spending behavior better with interactive graphs and
          breakdowns. Gain insights into your expenses and optimize where your
          money goes.
        </motion.p>

        <motion.div
          variants={GRAPH_CONTAINER}
          initial="hidden"
          whileInView="visible"
          className="grid gap-10 md:grid-cols-2"
        >
          {/* Category Wise Expense Visualization */}
          <motion.div
            variants={GRAPH_BOX}
            className="rounded-2xl bg-white p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
          >
            <h3 className="mb-2 text-xl font-bold text-[#00b87c]">
              Category Breakdown
            </h3>
            <p className="mb-4 text-gray-500">
              Get a clear visual distribution of your expenses across different
              categories. Easily spot which areas consume most of your budget.
            </p>
            <img
              src="https://i.ibb.co/SXyb0jbP/report-1.png"
              alt="Category wise expense chart"
              className="rounded-lg"
            />
          </motion.div>

          {/* Expenses Details Graph */}
          <motion.div
            variants={GRAPH_BOX}
            className="rounded-2xl bg-white p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
          >
            <h3 className="mb-2 text-xl font-bold text-[#00b87c]">
              Spending Trends Over Time
            </h3>
            <p className="mb-4 text-gray-500">
              Monitor your monthly, weekly, or daily expenses. Understand your
              financial flow and identify months with higher spending patterns.
            </p>
            <img
              src="https://i.ibb.co/tpT968J7/repo-2.png"
              alt="Expenses over time graph"
              className="rounded-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsPreview;
