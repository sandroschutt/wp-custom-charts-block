<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="chart-container">
		<div class="chart-data">
			<pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre>
		</div>
		<canvas id="<?php echo esc_html("MyChart-" . $attributes['id']) ?>"></canvas>
	</div>
</div>
