<template>
  <div>
    <CallLogsHeader />
    <CallTable />
  </div>
</template>

<script>
import CallLogsHeader from '@/components/CallLog/Header';
import CallTable from '@/components/CallLog/CallTable';

export default {
  name: 'call-logs',
  components: { CallLogsHeader, CallTable }
};
</script>
